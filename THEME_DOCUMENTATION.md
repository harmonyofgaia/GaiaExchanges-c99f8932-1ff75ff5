# Theme Selection and UI Lock Features

This document describes the new theme selection and UI lock functionality added to Gaia Exchanges.

## Overview

Two new features have been added to enhance user experience and provide UI protection:

1. **Theme Selection System** - Allows users to choose from multiple visual themes
2. **UI Lock Mechanism** - Protects the interface from unintended changes

## Theme Selection Feature

### Location

- **Homepage**: Small floating theme selector button in the bottom-right corner
- **All Pages**: Themes apply globally across the entire application

### Available Themes

| Theme           | Icon | Description                                         |
| --------------- | ---- | --------------------------------------------------- |
| Dark            | 🌙   | Classic dark theme with matrix aesthetics (default) |
| Light           | ☀️   | Clean light theme for daytime use                   |
| Mellow Colorful | 🌈   | Soft, warm colors with earth tones                  |
| Space           | 🚀   | Deep space theme with cosmic colors                 |
| Forest          | 🌲   | Natural forest theme with green harmony             |
| Ocean           | 🌊   | Deep ocean blues and aqua tones                     |

### Usage

1. **Open Theme Menu**: Click the floating theme selector button (🎨) on the homepage
2. **Select Theme**: Choose any theme from the dropdown menu
3. **Confirmation**: Toast notification confirms theme change
4. **Persistence**: Selected theme is saved to localStorage and applies to all pages

### Technical Implementation

- **Framework**: Built using `next-themes` for theme management
- **Storage**: Theme preference stored in browser localStorage
- **CSS**: Custom CSS variables for each theme in Tailwind CSS format
- **Global Application**: Theme classes applied to root element affecting all components

## UI Lock Feature

### Purpose

Prevents accidental changes or deletions to the design/layout while allowing additions.

### Location

Available in the same theme selector menu.

### States

| State    | Icon | Status    | Description                        |
| -------- | ---- | --------- | ---------------------------------- |
| Unlocked | 🔓   | Editable  | Theme and layout changes allowed   |
| Locked   | 🔒   | Protected | Theme and layout changes prevented |

### Usage

1. **Access Lock Control**: Open theme selector menu
2. **Toggle Lock**: Click on the lock/unlock button
3. **Confirmation**: Toast notification confirms lock state change
4. **Protection**: When locked, theme options become disabled and grayed out

### Behavior When Locked

- ❌ **Theme changes blocked** - All theme options become disabled
- ❌ **Layout modifications prevented** - UI elements protected from changes
- ✅ **Additions still allowed** - New content can be added
- ✅ **Lock state persists** - Preference saved to localStorage

### Technical Implementation

- **Storage**: Lock state persisted in localStorage as `gaia-ui-lock`
- **Context API**: Uses React Context for global lock state management
- **UI Feedback**: Visual indicators (disabled states, toast notifications)
- **Error Handling**: Graceful error messages when attempting locked actions

## Installation & Setup

The features are automatically available after the component integration:

1. **ThemeProvider** wraps the entire application in `main.tsx`
2. **ThemeSelector** component added to homepage
3. **CSS themes** defined in `index.css`
4. **Lock context** integrated into theme system

## File Structure

```
src/
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx      # Theme & lock context providers
│   └── ThemeSelector.tsx          # Main theme selector component
├── pages/
│   └── Home.tsx                   # Homepage with theme selector
├── index.css                      # Theme CSS variables
└── main.tsx                       # App wrapper with providers
```

## API Reference

### ThemeProvider

```typescript
// Available themes
const AVAILABLE_THEMES = {
  dark: { name: "Dark", description: "...", icon: "🌙" },
  light: { name: "Light", description: "...", icon: "☀️" },
  // ... more themes
};

// Theme selection
const { theme, setTheme } = useTheme();

// Lock functionality
const { isLocked, toggleLock } = useLock();
```

### CSS Variables

Each theme defines CSS custom properties:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 142.1 70.6% 45.3%;
  /* ... more variables */
}
```

## Browser Compatibility

- ✅ Modern browsers with localStorage support
- ✅ CSS custom properties support required
- ✅ Tested on Chrome, Firefox, Safari, Edge

## Future Enhancements

Potential improvements for future versions:

1. **Theme Customization** - Allow users to create custom themes
2. **Admin-Only Themes** - Restrict certain themes to admin users
3. **Time-Based Themes** - Automatic theme switching based on time of day
4. **Export/Import** - Share theme preferences between devices
5. **More Granular Locks** - Lock specific sections instead of entire UI

## Troubleshooting

### Theme Not Persisting

- Check browser localStorage permissions
- Verify `next-themes` is properly configured
- Clear browser cache and localStorage

### Lock Not Working

- Ensure `gaia-ui-lock` key exists in localStorage
- Check React Context provider hierarchy
- Verify component is wrapped in ThemeProvider

### Theme Selector Not Visible

- Confirm ThemeSelector component is imported in Home.tsx
- Check CSS positioning and z-index values
- Verify no conflicting styles are hiding the button
