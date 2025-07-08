# System Patterns

## Architecture Patterns
**Client-Server**: Real-time multiplayer with Supabase backend
**Database**: PostgreSQL with Supabase real-time subscriptions
**Frontend**: Phaser.js game engine with scene-based architecture

## Current Technical Patterns

### Database Schema
- `games`: Game sessions and metadata
- `game_players`: Player participation and state  
- `game_states`: Current game state and progression
- `players`: User profiles and credits

### Real-time Communication
- Supabase Realtime subscriptions for live updates
- Heartbeat system (5-second intervals)
- Connection state tracking

### Cleanup Patterns
- **Current**: 30-second client-side cleanup, single game scope
- **Target**: 10-second server-side cleanup, configurable scope

## Development Patterns
- Docker containerized deployment
- Scene-based UI architecture (Phaser.js)
- VK Bridge API integration for social features

---
*Updated: $(date)*
