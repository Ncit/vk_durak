async function upsertToSupabase(tableName, data, onConflictColumn = 'id') {

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
    }
}

async function loadLobby() {
  const { data: games, error } = await window.gameConfig.supabase
    .from('games')
    .select('*')
    .limit(15)
    .eq('status', 'waiting');
  if (error) {
    console.error('Error loading games:', error);
    return;
  }
  return await games;
}

async function createNewGame() {
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
}

async function joinGame(gameId) {
  // Check if player already in game
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
  const { data: game, error: gameError } = await window.gameConfig.supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single();
  
  if (gameError) {
    alert('Error getting game data: ' + gameError.message);
    return;
  }
  

     console.log("Current game");
     console.log(game);
     console.log("---");
  window.gameConfig.currentGame = game;
  
  // // Subscribe to game updates
  // setupGameSubscriptions(gameId);
  
  // // Load initial game state
  // loadGameState(gameId);
}

function setupGameSubscriptions(gameId) {
  // Game state changes
  supabase
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
  supabase
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
        await loadPlayers(currentGame.id);
      }
    )
    .subscribe();
}

async function loadGameState(gameId) {
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
}

async function loadPlayers(gameId) {
  const { data: gamePlayers, error } = await window.gameConfig.supabase
    .from('game_players')
    .select(`
      *,
      player:players(username, avatarUrl)
    `)
    .eq('game_id', gameId)
    .order('seat_number', { ascending: true });
  
  if (error) {
    console.error('Error loading players:', error);
    return;
  }
  
  window.gameConfig.players = gamePlayers;
  renderPlayers();
}

function updateGameState(state) {
  window.gameConfig.gameState = state;
  
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
     console.log("RENDER");
}



// In your client-side code
const HEARTBEAT_INTERVAL = 50000; // 5 seconds

function startHeartbeat(gameId) {
  // Send initial heartbeat
  sendHeartbeat(gameId);
  
  // Set up periodic heartbeat
  const heartbeatInterval = setInterval(() => {
    sendHeartbeat(gameId);
  }, HEARTBEAT_INTERVAL);
  
  // Cleanup on disconnect
  window.addEventListener('beforeunload', () => {
    clearInterval(heartbeatInterval);
    markAsDisconnected(gameId);
  });
}

async function sendHeartbeat(gameId) {
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
  }
}

// In your game state management
async function handleDisconnectedPlayers(gameId) {
  // Get all disconnected players
  const { data: disconnectedPlayers, error } = await supabase
    .from('game_players')
    .select('*')
    .eq('game_id', gameId)
    .eq('connection_status', 'disconnected')
    .eq('is_active', true);
  
  if (error || !disconnectedPlayers.length) return;
  
  for (const player of disconnectedPlayers) {
    // If player is in current hand, auto-fold them
    if (gameState && gameState.stage !== 'showdown') {
      await supabase
        .from('game_players')
        .update({ 
          is_active: false,
          cards: []  // Clear their cards
        })
        .eq('id', player.id);
      
      // Notify other players
      await supabase
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
}