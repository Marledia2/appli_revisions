import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      recipes: {
        lofiContainer: {
          className: 'lofi-container',
          base: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background 0.8s ease-in-out',
            color: 'white',
          },
          variants: {
            themeVariant: {
              forest: { backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920&auto=format&fit=crop")', backgroundColor: '#1E352F' },
              beach: { backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop")', backgroundColor: '#E2D4B7' },
              sea: { backgroundImage: 'url("https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=1920&auto=format&fit=crop")', backgroundColor: '#0B3954' },
              night: { backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop")', backgroundColor: '#000000' },
              custom: { backgroundColor: '#1f2937' }
            }
          },
          defaultVariants: {
            themeVariant: 'night'
          }
        }
      }
    }
  },
  outdir: "styled-system",
});