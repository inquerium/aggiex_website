/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Texas A&M maroon colors
        maroon: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#f8d0d7",
          300: "#f2aab7",
          400: "#e87990",
          500: "#d84a6b",
          600: "#c02b4c",
          700: "#a01c3d", // Texas A&M primary maroon
          800: "#851a36",
          900: "#721a32",
          DEFAULT: "#500000", // Your specific hex
        },
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "glow": {
          "0%, 100%": {
            textShadow: "0 0 10px #500000, 0 0 20px #500000, 0 0 30px #500000",
            filter: "drop-shadow(0 0 5px #500000)"
          },
          "50%": {
            textShadow: "0 0 20px #500000, 0 0 30px #500000, 0 0 40px #500000",
            filter: "drop-shadow(0 0 10px #500000)"
          },
        },
        "typing": {
          "0%": { 
            width: "0%",
            visibility: "hidden"
          },
          "100%": { 
            width: "100%",
            visibility: "visible"
          },
        },
        "blink": {
          "50%": { 
            borderColor: "transparent"
          },
          "100%": { 
            borderColor: "#D1D1D1"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 1.5s infinite",
        "typing": "typing 2s steps(20) 1s 1 normal both, blink .7s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
