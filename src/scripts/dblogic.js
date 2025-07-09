// Global scene reference for loading indicators
window.currentScene = null;

// Helper function to get current active scene
function getCurrentScene() {
  return window.currentScene || null;
}

// Helper function to show loading with fallback
function showAsyncLoader(message = 'Loading...', options = {}) {
  const scene = getCurrentScene();
  if (scene && window.phaserLoader) {
    return window.phaserLoader.showLoader(scene, message, options);
  }
  console.log(`Loading: ${message}`); // Fallback for console
  return null;
}

// Helper function to hide loading with fallback
function hideAsyncLoader(loaderId) {
  if (window.phaserLoader) {
    // With single loader system, we can just hide current loader
    window.phaserLoader.hideCurrent();
  }
}

// Helper function to check if loader is active
function isLoaderActive() {
  return window.phaserLoader && window.phaserLoader.isActive();
}

async function upsertToSupabase(tableName, data, onConflictColumn = 'id') {
  const loaderId = showAsyncLoader(`LOADING`);

 try {
      const { data: responseData, error } = await window.gameConfig.supabase
        .from(tableName)
        .upsert(data, { onConflict: onConflictColumn })
        .select()

      if (error) throw error
      return responseData
    } catch (error) {
      console.error('Supabase error:', error)
      throw error
    } finally {
      hideAsyncLoader(loaderId);
    }
}

async function loadLobby() {
  const loaderId = showAsyncLoader('Loading game lobby...');

  try {
    const { data: games, error } = await window.gameConfig.supabase
      .from('games')
      .select('*')
      .limit(15)
      .eq('status', 'waiting');
    if (error) {
      console.error('Error loading games:', error);
      return;
    }
    return games;
  } finally {
    hideAsyncLoader(loaderId);
      callEdgeFunction();
      cleanDB();
  }

}

async function createNewGame() {
  const loaderId = showAsyncLoader('Creating new game...');

  try {
    const smallBlind = 300;
    const bigBlind = smallBlind * 2;
    
    const { data: game, error } = await window.gameConfig.supabase
      .from('games')
      .insert([{
        name: 'Играем в покер с друзьями',
        small_blind: smallBlind,
        big_blind: bigBlind,
        max_players: 5,
        created_by: 6582162,
        status: 'waiting'
      }])
      .select()
      .single();
    
    if (error) {
      alert('Error creating game: ' + error.message);
      return;
    }
    
    // // Join the game as player
    // await joinGame(game.id);
  } finally {
    hideAsyncLoader(loaderId);
  }
}

async function joinGame(gameId) {
  const loaderId = showAsyncLoader('Joining game...');

  try {
    // Check if player already in game
    if (window.phaserLoader && getCurrentScene()) {
      window.phaserLoader.updateMessage(loaderId, 'Checking player status...');
    }
    
    const { data: existingPlayer, error: existingError } = await window.gameConfig.supabase
      .from('game_players')
      .select('*')
      .eq('game_id', gameId)
      .eq('player_id', window.gameConfig.currentUser.id)
      .maybeSingle();
    
    if (existingError) {
      alert('Error checking existing player: ' + existingError.message);
      return;
    }
    
    if (!existingPlayer) {
      // Get player credits
      if (window.phaserLoader && getCurrentScene()) {
        window.phaserLoader.updateMessage(loaderId, 'Loading player data...');
      }
      
      const { data: player, error: playerError } = await window.gameConfig.supabase
        .from('players')
        .select('credits')
        .eq('id', window.gameConfig.currentUser.id)
        .single();
      
      if (playerError) {
        alert('Error getting player data: ' + playerError.message);
        return;
      }
      
      // Add player to game
      if (window.phaserLoader && getCurrentScene()) {
        window.phaserLoader.updateMessage(loaderId, 'Adding player to game...');
      }
      
      const { error: joinError } = await window.gameConfig.supabase
        .from('game_players')
        .insert([{
          game_id: gameId,
          player_id: window.gameConfig.currentUser.id,
          chips: player.credits,
          is_active: true
        }]);
      
      if (joinError) {
        alert('Error joining game: ' + joinError.message);
        return;
      }
    }
    
    // Get game data
    if (window.phaserLoader && getCurrentScene()) {
      window.phaserLoader.updateMessage(loaderId, 'Loading game data...');
    }
    
    const { data: game, error: gameError } = await window.gameConfig.supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();
    
    if (gameError) {
      alert('Error getting game data: ' + gameError.message);
      return;
    }
    console.log("----");
    console.log(game);
    window.gameConfig.currentGame = game;
    
        startHeartbeat(game.id);

    // // Subscribe to game updates
    setupGameSubscriptions(gameId);
    
    // // Load initial game state
    loadGameState(gameId);

  } finally {
    hideAsyncLoader(loaderId);

  }
}

function setupGameSubscriptions(gameId) {
  // Game state changes
  window.gameConfig.supabase
    .channel('game-state-' + gameId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'game_states',
        filter: `game_id=eq.${gameId}`
      },
      (payload) => {
        updateGameState(payload.new);
      }
    )
    .subscribe();
  
  // Player changes
  window.gameConfig.supabase
    .channel('game-players-' + gameId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'game_players',
        filter: `game_id=eq.${gameId}`
      },
      async (payload) => {
        await loadPlayers(window.gameConfig.currentGame.id);
      }
    )
    .subscribe();
}

async function loadGameState(gameId) {
  const loaderId = showAsyncLoader('Loading game state...');

  try {
    const { data: state, error } = await window.gameConfig.supabase
      .from('game_states')
      .select('*')
      .eq('game_id', gameId)
      .maybeSingle();
  
  if (error) {
    console.error('Error loading game state:', error);
    return;
  }
  
  if (state) {
    updateGameState(state);
  } else {
    // Initialize game state if not exists
    if (window.phaserLoader && getCurrentScene()) {
      window.phaserLoader.updateMessage(loaderId, 'Initializing game state...');
    }
    
    const { data: newState, error: initError } = await window.gameConfig.supabase
      .from('game_states')
      .insert([{
        game_id: gameId,
        stage: 'preflop',
        pot: 0,
        current_bet: 0
      }])
      .select()
      .single();
    
    if (initError) {
      console.error('Error initializing game state:', initError);
      return;
    }
    
    updateGameState(newState);
  }
  
  await loadPlayers(gameId);
} finally {
  hideAsyncLoader(loaderId);
}
}

async function loadPlayers(gameId) {
  const loaderId = showAsyncLoader('Loading players...');

  try {
    const { data: gamePlayers, error } = await window.gameConfig.supabase
      .from('game_players')
      .select(`
      *,
      player:players(name, avatarUrl)
    `)
    .eq('game_id', gameId)
    .order('seat_number', { ascending: true });
  
  if (error) {
    console.error('Error loading players:', error);
    return;
  }
  
  window.gameConfig.players = gamePlayers;
  renderPlayers();
} finally {
  hideAsyncLoader(loaderId);
}
}

function updateGameState(state) {
  window.gameConfig.gameState = state;
  console.log("---")
  console.log(state);
  console.log("---")
  // // Update UI
  // potAmount.textContent = state.pot;
  
  // // Render community cards
  // communityCardsDiv.innerHTML = '';
  // if (state.community_cards && state.community_cards.length > 0) {
  //   state.community_cards.forEach(card => {
  //     const cardElement = createCardElement(card);
  //     communityCardsDiv.appendChild(cardElement);
  //   });
  // }
  
  // // Highlight current player
  // renderPlayers();
  
  // // Update action buttons based on game state
  // updateActionButtons();
}

function renderPlayers() {
    console.log("Rendering players:", window.gameConfig.players);
    
    // If we're in RobotRoomScene, refresh the multiplayer display
    if (window.currentScene && window.currentScene.scene && window.currentScene.scene.key === 'RobotRoomScene') {
        console.log("Refreshing RobotRoomScene with new player data");
        if (typeof window.currentScene.refreshPlayers === 'function') {
            window.currentScene.refreshPlayers();
        }
    }
}



// In your client-side code
function startHeartbeat(gameId) {
  

const HEARTBEAT_INTERVAL = 5000; // 5 seconds
try {
  // Send initial heartbeat
  sendHeartbeat(gameId);
  const heartbeatInterval = setInterval(() => {
    sendHeartbeat(gameId);
  }, HEARTBEAT_INTERVAL);
} catch(error) {
    console.error('Heartbeat failed:', error);
}
  // Cleanup on disconnect
  window.addEventListener('beforeunload', () => {
    clearInterval(heartbeatInterval);
    markAsDisconnected(gameId);
  });
}

async function sendHeartbeat(gameId) {
  // Silent operation - no loader needed for heartbeat
  try {
    await window.gameConfig.supabase
      .from('game_players')
      .update({ 
        last_seen: new Date().toISOString(),
        connection_status: 'connected'
      })
      .eq('game_id', gameId)
      .eq('player_id', window.gameConfig.currentUser.id);
  } catch (error) {
    console.error('Heartbeat failed:', error);
  }
}

async function markAsDisconnected(gameId) {
  const loaderId = showAsyncLoader('Disconnecting...');

  try {
    await window.gameConfig.supabase
      .from('game_players')
      .update({ 
        connection_status: 'disconnected',
        last_seen: new Date().toISOString()
      })
      .eq('game_id', gameId)
      .eq('player_id', window.gameConfig.currentUser.id);
  } catch (error) {
    console.error('Failed to mark as disconnected:', error);
  } finally {
    hideAsyncLoader(loaderId);
  }
}

// In your game state management
async function handleDisconnectedPlayers(gameId) {
  const loaderId = showAsyncLoader('Handling disconnected players...');

  try {
    // Get all disconnected players
    const { data: disconnectedPlayers, error } = await window.gameConfig.supabase
      .from('game_players')
      .select('*')
      .eq('game_id', gameId)
      .eq('connection_status', 'disconnected')
      .eq('is_active', true);
    
    if (error || !disconnectedPlayers.length) return;
    
    for (const player of disconnectedPlayers) {
      // If player is in current hand, auto-fold them
      if (gameState && gameState.stage !== 'showdown') {
        await window.gameConfig.supabase
          .from('game_players')
          .update({ 
            is_active: false,
            cards: []  // Clear their cards
          })
          .eq('id', player.id);
        
        // Notify other players
        await window.gameConfig.supabase
          .channel('game-notifications-' + gameId)
          .send({
            type: 'broadcast',
            event: 'player_disconnected',
            payload: { playerId: player.player_id }
          });
      }
    }
    
    // Check if game needs to continue with remaining players
    await checkGameContinuation(gameId);
  } finally {
    hideAsyncLoader(loaderId);
  }
}

function cleanDB() {

  window.setInterval(function(){ // Set interval for checking
    callEdgeFunction();
}, 30000);
}
async function callEdgeFunction() {
  // Silent cleanup operation - no loader needed
  const { data, error } = await window.gameConfig.supabase.from('game_players')
    .delete()
    .lt('last_seen', new Date(Date.now() - 30 * 1000).toISOString());

  if (error) {
    console.error('Error invoking function:', error)
    return
  }
  return data
}