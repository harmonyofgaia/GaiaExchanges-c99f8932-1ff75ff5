# Green Investments Background Implementation

## Overview
Successfully implemented a new background visual layer for the Green Investments page as specified in the requirements.

## Features Implemented

### Background Components
- **Hallway Background**: Gradient-based green neon tint (ready for hallway image replacement)
- **Matrix Rain Effect**: Very subtle, performance-optimized falling characters
- **Growing Roots Animation**: SVG-based line animation using stroke-dasharray

### Performance Optimizations
- Frame rate capped at 30 FPS
- Device pixel ratio limited to 2x maximum
- Canvas operations optimized for low CPU usage
- Reduced effect intensity on mobile devices

### Accessibility & UX
- `prefers-reduced-motion` support - disables all animations when set
- `pointer-events: none` on all background elements
- Proper z-index layering (background: 0, content: 1)
- All content remains fully interactive and clickable

### Technical Implementation
- **Component**: `/src/components/backgrounds/GreenInvestmentsBackground.tsx`
- **Styles**: `/src/styles/green-investments-new-background.css`
- **Integration**: Updated `/src/pages/GreenInvestments.tsx`

## Files Modified
1. `src/pages/GreenInvestments.tsx` - Updated to use new background component
2. `src/components/backgrounds/GreenInvestmentsBackground.tsx` - New background component
3. `src/styles/green-investments-new-background.css` - New CSS styles
4. `public/assets/hallway.jpg` - Placeholder for hallway image

## Visual Effects
- Subtle green neon tinting with radial gradients
- Matrix rain characters falling at controlled speed
- Growing roots animation with glow effects
- Responsive design that adapts to screen size

## Performance Characteristics
- Low CPU usage through optimized canvas operations
- Efficient memory management with object pooling
- Hardware acceleration for CSS animations
- Graceful degradation on low-end devices

## How to Customize
- Adjust matrix rain opacity in the component (currently 0.15-0.2)
- Modify roots animation speed via CSS `animation-duration`
- Replace hallway.jpg with actual hallway image
- Tweak neon tint colors in the CSS gradients

## Testing Results
- ✅ Build passes without errors
- ✅ Linting passes for new files
- ✅ All tests continue to pass
- ✅ Visual verification completed with screenshots
- ✅ Interactive elements remain clickable
- ✅ Background does not interfere with user interactions