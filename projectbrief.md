# VK Durak Poker - Project Brief

## Project Overview
**Type**: Multiplayer Texas Hold'em Poker Game  
**Platform**: Web (Phaser.js)  
**Database**: Supabase (Local Development)  
**Architecture**: Client-Server with Real-time Updates  

## Core Components
- **Frontend**: Phaser.js game engine with multiple scenes
- **Backend**: Supabase database with real-time subscriptions
- **Networking**: VK Bridge integration for social features
- **Game Logic**: Texas Hold'em poker rules and player management

## Database Schema
- **games**: Game sessions and metadata
- **game_players**: Player participation and state
- **game_states**: Current game state and progression
- **players**: User profiles and credits

## Current Features
- Lobby system for game discovery
- Real-time multiplayer gameplay
- Player heartbeat and connection tracking
- Basic database cleanup (30s intervals)

## Technical Stack
- **Game Engine**: Phaser.js v3
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase Realtime subscriptions
- **Social**: VK Bridge API
- **Deployment**: Docker containerized

---
*Created: Tue Jul  8 21:41:11 MSK 2025*
