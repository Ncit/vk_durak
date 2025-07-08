# Technical Context

## Technology Stack
- **Game Engine**: Phaser.js v3
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase Realtime subscriptions
- **Social**: VK Bridge API
- **Deployment**: Docker containerized
- **Development**: Local Supabase instance

## Current Implementation Environment
- **Database**: Local Supabase development setup
- **Game Logic**: Client-side with server validation
- **Networking**: WebSocket-based real-time updates
- **Asset Management**: Static assets in `/assets` directory

## Database Cleanup Context
### Current Implementation
- **Cleanup Interval**: 30 seconds
- **Scope**: Single game cleanup
- **Method**: Client-side database calls
- **Tables**: games, game_players, game_states

### Target Implementation  
- **Cleanup Interval**: 10 seconds
- **Scope**: Configurable (single game or global)
- **Method**: Server-side optimized solution
- **Integration**: Maintain existing heartbeat (5s intervals)

## Available Implementation Options
1. **Supabase pg_cron**: Minimum 1-minute intervals (limitation)
2. **Edge Functions + External Scheduler**: 10-second capable
3. **Enhanced Client-side**: Immediate solution, optimized approach

---
*Updated: $(date)*
