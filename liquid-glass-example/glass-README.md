# Liquid Glass Effect 🌟

A modern glassmorphism effect implementation using pure CSS, similar to the new Liquid Glass Effect created by Apple.

## 🚀 Demo

[View Live Demo](https://kevinbism.github.io/liquid-glass-effect/)

## ✨ Features

- **Pure CSS Implementation** - No JavaScript required
- **Responsive Design** - Works on all screen sizes
- **Modern Glassmorphism** - Trendy glass effect with backdrop blur
- **Customizable** - Easy to modify colors and effects
- **Lightweight** - Minimal code footprint
- **Cross-browser Compatible** - Works on modern browsers

## 🎨 How the Glass Effect Works

The liquid glass effect is achieved through a combination of several CSS properties and techniques:

### 1. Base Glass Container

```css
.glass {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(2px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3);
}
```

### 2. Liquid Effect with Pseudo-element

```css
.glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  backdrop-filter: blur(1px);
  box-shadow: inset -10px -8px 0px -11px rgba(255, 255, 255, 1), inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px black) brightness(115%);
}
```

### 3. Key CSS Properties Explained

| Property                  | Purpose                               |
| ------------------------- | ------------------------------------- |
| `backdrop-filter: blur()` | Creates the frosted glass blur effect |
| `background: rgba()`      | Semi-transparent background           |
| `box-shadow: inset`       | Creates inner glow and depth          |
| `border: rgba()`          | Subtle glass-like borders             |
| `filter: drop-shadow()`   | Adds realistic shadow effects         |
| `opacity`                 | Controls transparency levels          |

### 4. Background Enhancement

The effect is enhanced with:

- Gradient background
- Radial gradient overlays for depth
- High-quality background image
- Fixed attachment for parallax effect

## 🎯 Customization

### Color Variations

Modify these values to change the glass tint:

```css
background: rgba(255, 255, 255, 0.15); /* Glass transparency */
border: 1px solid rgba(255, 255, 255, 0.8); /* Border color */
```

### Blur Intensity

Adjust the blur effect:

```css
backdrop-filter: blur(2px) saturate(180%); /* Increase blur value */
```

### Shadow Effects

Customize the depth and glow:

```css
box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2), /* Outer shadow */ inset 0 4px 20px rgba(255, 255, 255, 0.3); /* Inner glow */
```

## 🔧 Browser Support

| Browser | Support          |
| ------- | ---------------- |
| Chrome  | ✅ Full support  |
| Firefox | ✅ Full support  |
| Safari  | ✅ Full support  |
| Edge    | ✅ Full support  |
| IE      | ❌ Not supported |

**Note**: `backdrop-filter` requires modern browser support. For older browsers, consider using a polyfill or fallback styles.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? [Open an issue](https://github.com/kevinbism/liquid-glass-effect/issues)
- 💡 **Feature Requests**: Have an idea? [Create a feature request](https://github.com/kevinbism/liquid-glass-effect/issues)
- 🔧 **Code Improvements**: Submit a pull request with enhancements
- 🎨 **Design Variations**: Share your glass effect variations

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

### Code Style Guidelines

- Use semantic HTML elements
- Follow CSS naming conventions
- Comment complex CSS properties
- Ensure responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple WWD 2025 conference
- Background image from [Unsplash](https://unsplash.com)
- CSS backdrop-filter for the blur effect

---

⭐ If you found this project helpful, please give it a star on GitHub!

## 🔗 Related Projects

- [Glassmorphism Generator](https://css.glass/)
- [Code Pen Example](https://codepen.io/kevinbism/pen/vEOpvjw)

---

Made with ❤️ and CSS magic
