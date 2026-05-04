# TikTok Web App UI/UX Template

## 🎨 Color Palette

### Primary Colors
- **Primary Brand**: `#FE2C55` (TikTok Pink/Red)
- **Primary Dark**: `#E01E42`
- **Primary Light**: `#FF4367`
- **Primary Glow**: `rgba(254, 44, 85, 0.3)`

### Secondary Colors
- **Secondary Cyan**: `#25F4EE` (TikTok Cyan/Aqua)
- **Secondary Dark**: `#1CD6D1`
- **Secondary Light**: `#4DF5EF`

### Background Colors
- **Background Dark**: `#121212` (Main background)
- **Background Surface**: `#1F1F1F` (Cards, panels)
- **Background Elevated**: `#2A2A2A` (Modals, dropdowns)
- **Background Overlay**: `rgba(0, 0, 0, 0.7)`

### Text Colors
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A8A8A8`
- **Text Muted**: `#6B6B6B`
- **Text Inverse**: `#161823`

### Accent Colors
- **Success**: `#12B76A`
- **Warning**: `#F79009`
- **Error**: `#F04438`
- **Info**: `#25F4EE`

### Interactive States
- **Hover**: `rgba(255, 255, 255, 0.1)`
- **Active**: `rgba(255, 255, 255, 0.2)`
- **Focus**: `#25F4EE`
- **Disabled**: `#4A4A4A`

---

## 📐 Typography

### Font Family
```css
Primary: 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Code: 'SF Mono', 'Consolas', monospace
```

### Font Sizes
- **Display Large**: `48px` (h1, hero titles)
- **Display Medium**: `36px` (h2, section headers)
- **Display Small**: `28px` (h3, subsections)
- **Heading 1**: `24px` (h4, card titles)
- **Heading 2**: `20px` (h5, list headers)
- **Heading 3**: `18px` (h6, small headers)
- **Body Large**: `16px` (main content)
- **Body Medium**: `15px` (descriptions)
- **Body Small**: `14px` (captions, metadata)
- **Caption**: `12px` (labels, timestamps)
- **Tiny**: `10px` (fine print)

### Font Weights
- **Thin**: 200
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Line Heights
- **Tight**: 1.2 (headings)
- **Normal**: 1.5 (body text)
- **Relaxed**: 1.75 (readable paragraphs)

---

## 🧩 Component Library

### 1. Video Card Component
```
┌─────────────────────────────┐
│                             │
│    [Video Thumbnail]        │
│         9:16 ratio          │
│                             │
│  ┌───────────────────────┐  │
│  │ @username             │  │
│  │ Video caption text... │  │
│  │ 👁 1.2M  💬 4.5K     │  │
│  └───────────────────────┘  │
└─────────────────────────────┘

Colors:
- Background: #1F1F1F
- Text: #FFFFFF
- Meta: #A8A8A8
- Hover overlay: rgba(254, 44, 85, 0.1)
```

### 2. Navigation Bar
```
┌───────────────────────────────────────────────────────┐
│ [Logo]     For You | Following | LIVE    🔍 [@] [≡]  │
└───────────────────────────────────────────────────────┘

Height: 60px
Background: #121212
Border bottom: 1px solid #2A2A2A
Active tab underline: #FE2C55 (3px)
```

### 3. Button Variants

#### Primary Button
- Background: `#FE2C55`
- Text: `#FFFFFF`
- Hover: `#E01E42`
- Border radius: `4px`
- Padding: `12px 24px`
- Font weight: `600`

#### Secondary Button
- Background: `#1F1F1F`
- Text: `#FFFFFF`
- Border: `1px solid #A8A8A8`
- Hover: `rgba(255, 255, 255, 0.1)`

#### Icon Button
- Background: `rgba(255, 255, 255, 0.1)`
- Icon color: `#FFFFFF`
- Size: `40px × 40px`
- Border radius: `50%`

#### Follow Button
- Unfollowed: Background `#FE2C55`, Text `#FFFFFF`
- Following: Background `transparent`, Border `1px solid #A8A8A8`, Text `#A8A8A8`

### 4. Input Fields
```
┌─────────────────────────────┐
│ 🔍  Search accounts...      │
└─────────────────────────────┘

Background: #1F1F1F
Border: 1px solid #2A2A2A
Focus border: 1px solid #25F4EE
Placeholder: #6B6B6B
Text: #FFFFFF
Height: 44px
Border radius: 8px
```

### 5. Video Player Controls
```
Interactive elements:
- Play/Pause: Center overlay icon
- Progress bar: Bottom, #FE2C55 fill
- Volume: Icon + slider
- Fullscreen: Bottom right
- Like: Right side, heart icon
- Comment: Right side, bubble icon
- Share: Right side, arrow icon
```

### 6. Comment Card
```
┌─────────────────────────────────────┐
│ [@] username • 2h ago               │
│     This is amazing! 🔥             │
│     ❤ 234   💬 Reply               │
└─────────────────────────────────────┘

Avatar size: 32px
Username: #FFFFFF, 14px, bold
Time: #A8A8A8, 12px
Text: #FFFFFF, 14px
Actions: #A8A8A8, 12px
```

### 7. User Profile Card
```
┌─────────────────────────────────────┐
│        [Avatar - 96px]              │
│         @username                   │
│      Display Name Here              │
│                                     │
│  [Follow Button - Primary]          │
│                                     │
│  1.2M      432       156            │
│  Following Followers  Likes         │
│                                     │
│  Bio text goes here...              │
└─────────────────────────────────────┘
```

### 8. Modal/Dialog
```
Background overlay: rgba(0, 0, 0, 0.7)
Modal background: #1F1F1F
Border radius: 12px
Max width: 480px
Padding: 24px
Shadow: 0 8px 32px rgba(0, 0, 0, 0.5)
```

---

## 📱 Layout Structure

### Grid System
- **Container max-width**: 1440px
- **Gutter**: 16px
- **Columns**: 12 (desktop), 6 (tablet), 4 (mobile)
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Border Radius
- **sm**: 4px (buttons, small cards)
- **md**: 8px (inputs, medium cards)
- **lg**: 12px (modals, large cards)
- **xl**: 16px (featured elements)
- **full**: 9999px (pills, avatars)

---

## 🎭 Interaction Patterns

### Animations
```css
/* Smooth transitions */
transition: all 0.2s ease-in-out;

/* Bounce effect for likes */
@keyframes heartBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### Hover States
- **Video cards**: Slight scale (1.02) + shadow increase
- **Buttons**: Background color darkens/lightens
- **Links**: Underline appears + color shift to cyan
- **Icons**: Scale (1.1) + rotation for favorites

### Loading States
- **Skeleton screens**: Animated gradient from `#1F1F1F` to `#2A2A2A`
- **Spinners**: Primary color (#FE2C55) rotating
- **Progress bars**: Gradient animation left to right

---

## 🎯 Page Templates

### 1. Feed Page (For You)
```
┌────────────────────────────────────────┐
│ [Navigation Bar]                       │
├────────────────────────────────────────┤
│                │                       │
│                │  [Video Player        │
│  [Sidebar]     │   Fullscreen 9:16]    │
│                │                       │
│  - For You     │   [Right Controls]    │
│  - Following   │   - Like              │
│  - LIVE        │   - Comment           │
│                │   - Share             │
│                │   - More              │
└────────────────────────────────────────┘
```

### 2. Profile Page
```
┌────────────────────────────────────────┐
│ [Navigation Bar]                       │
├────────────────────────────────────────┤
│         [Cover Image Optional]         │
│                                        │
│         [Profile Card]                 │
│                                        │
│  [Videos] [Liked] [Favorites]          │
│                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Video │ │Video │ │Video │           │
│  └──────┘ └──────┘ └──────┘           │
└────────────────────────────────────────┘
```

### 3. Search/Discover Page
```
┌────────────────────────────────────────┐
│ [Navigation Bar]                       │
├────────────────────────────────────────┤
│ [Search Input - Prominent]             │
│                                        │
│ Trending Hashtags:                     │
│ [#dance] [#comedy] [#cooking]          │
│                                        │
│ Top Creators:                          │
│ [User Card] [User Card] [User Card]    │
│                                        │
│ For You:                               │
│ [Video Grid - 3 columns]               │
└────────────────────────────────────────┘
```

---

## 🌓 Dark Mode (Default)

TikTok primarily uses dark mode. The color system above is optimized for dark backgrounds.

### Key Principles
- High contrast text (#FFFFFF on #121212)
- Subtle surface elevation (#1F1F1F, #2A2A2A)
- Vibrant accent colors for CTAs
- Reduce eye strain with muted grays for secondary text

---

## ♿ Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus indicators

### Interactive Elements
- Minimum touch target: 44×44px
- Keyboard navigation support
- Screen reader labels for icons
- Alt text for all images/videos

### Motion
- Respect `prefers-reduced-motion`
- Provide pause controls for auto-play
- Disable parallax for reduced motion users

---

## 📊 Icon System

### Primary Icons
- **Heart** (Like): Outlined → Filled (#FE2C55)
- **Comment**: Speech bubble
- **Share**: Forward arrow
- **Profile**: User silhouette
- **Search**: Magnifying glass
- **Upload**: Plus symbol
- **Menu**: Three horizontal lines
- **Close**: X symbol
- **Play**: Triangle
- **Pause**: Two bars

### Icon Sizes
- Small: 16px
- Medium: 20px
- Large: 24px
- XLarge: 32px

---

## 🎬 Video Specifications

### Aspect Ratio
- **Primary**: 9:16 (vertical)
- **Alternative**: 1:1 (square)
- **Fallback**: 16:9 (horizontal)

### Thumbnail
- Size: 270×480px (9:16)
- Format: WebP, JPEG fallback
- Quality: 85%

### Player Settings
- Auto-play: On scroll into view
- Auto-mute: Initially muted
- Loop: Enabled
- Controls: Show on hover/tap

---

## 💡 Best Practices

### Visual Hierarchy
1. **Primary actions**: Bright pink (#FE2C55)
2. **Secondary actions**: Cyan (#25F4EE) or white outlined
3. **Tertiary actions**: Gray/muted

### Content Density
- Comfortable spacing between elements
- Group related information
- Use whitespace to create breathing room

### Performance
- Lazy load images and videos
- Use WebP for images
- Implement infinite scroll with pagination
- Cache user preferences

### Branding
- Prominent logo placement
- Consistent use of brand colors
- Maintain playful, energetic tone
- Encourage user-generated content

---

## 📝 Component Code Examples

### Primary Button (CSS)
```css
.btn-primary {
  background: #FE2C55;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background: #E01E42;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(254, 44, 85, 0.3);
}
```

### Video Card (HTML Structure)
```html
<div class="video-card">
  <div class="video-thumbnail">
    <img src="thumbnail.jpg" alt="Video thumbnail">
    <div class="video-overlay">
      <button class="play-btn">▶</button>
    </div>
  </div>
  <div class="video-info">
    <div class="user-info">
      <img class="avatar" src="avatar.jpg" alt="User avatar">
      <span class="username">@username</span>
    </div>
    <p class="caption">Amazing video caption here! 🔥</p>
    <div class="stats">
      <span>👁 1.2M</span>
      <span>💬 4.5K</span>
      <span>❤ 234K</span>
    </div>
  </div>
</div>
```

---

## 🎨 Design Token Reference

```json
{
  "colors": {
    "primary": "#FE2C55",
    "secondary": "#25F4EE",
    "background": "#121212",
    "surface": "#1F1F1F",
    "text": {
      "primary": "#FFFFFF",
      "secondary": "#A8A8A8"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "typography": {
    "fontFamily": "Proxima Nova, sans-serif",
    "fontSize": {
      "body": "15px",
      "heading": "24px"
    }
  }
}
```

---

**Document Version**: 1.0  
**Last Updated**: 2026  
**Design System**: TikTok-inspired Web App  
**Platform**: Web (Responsive)
