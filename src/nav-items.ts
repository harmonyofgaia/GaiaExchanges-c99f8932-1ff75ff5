import React from "react"
import { 
  Index,
  About,
  Wallet,
  Markets,
  SmartContracts,
  SystemStatus,
  ComprehensiveStatus,
  Downloads,
  Marketing,
  Reinvestments,
  Transparency,
  Admin,
  Gaming,
  GaiaFighterGame,
  LiveTracking,
  GaiaCoinCrafter,
  LandscapeBuilder,
  NotFound
} from "./pages"

export const navItems = [
  {
    to: "/",
    page: () => React.createElement(Index)
  },
  {
    to: "/about",
    page: () => React.createElement(About)
  },
  {
    to: "/wallet",
    page: () => React.createElement(Wallet)
  },
  {
    to: "/markets",
    page: () => React.createElement(Markets)
  },
  {
    to: "/smart-contracts",
    page: () => React.createElement(SmartContracts)
  },
  {
    to: "/system-status",
    page: () => React.createElement(SystemStatus)
  },
  {
    to: "/comprehensive-status",
    page: () => React.createElement(ComprehensiveStatus)
  },
  {
    to: "/downloads",
    page: () => React.createElement(Downloads)
  },
  {
    to: "/marketing",
    page: () => React.createElement(Marketing)
  },
  {
    to: "/reinvestments",
    page: () => React.createElement(Reinvestments)
  },
  {
    to: "/transparency",
    page: () => React.createElement(Transparency)
  },
  {
    to: "/admin",
    page: () => React.createElement(Admin)
  },
  {
    to: "/gaming",
    page: () => React.createElement(Gaming)
  },
  {
    to: "/gaia-fighter-game",
    page: () => React.createElement(GaiaFighterGame)
  },
  {
    to: "/live-tracking",
    page: () => React.createElement(LiveTracking)
  },
  {
    to: "/gaia-coin-crafter",
    page: () => React.createElement(GaiaCoinCrafter)
  },
  {
    to: "/landscape-builder",
    page: () => React.createElement(LandscapeBuilder)
  },
  {
    to: "*",
    page: () => React.createElement(NotFound)
  }
]