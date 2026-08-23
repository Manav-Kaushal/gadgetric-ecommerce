# Gadgetric — 3D Product Customizer

An interactive 3D T-shirt customizer built with React Three Fiber. Users can change garment color, upload their own logo/texture images, or generate artwork from a text prompt via an AI image model — all rendered live on a 3D model in the browser, with a one-click export of the final design as a PNG.

## Features

- **Live 3D preview** — a GLB shirt model rendered with [react-three-fiber](https://github.com/pmndrs/react-three-fiber) / [drei](https://github.com/pmndrs/drei), with orbit camera controls and real-time material updates.
- **Color picker** — recolor the garment and see the change reflected on the model instantly.
- **Custom image upload** — apply your own image as a logo decal or a full all-over texture.
- **AI-generated artwork** — describe a design in a text prompt and generate a logo or full-texture image via an image-generation API, applied directly to the model.
- **Design export** — download the customized shirt canvas as a PNG.
- **Animated UI** — panel and tab transitions via [Framer Motion](https://www.framer.com/motion/).

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) (Pages Router), TypeScript |
| 3D rendering | [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei`, `maath` |
| State | [valtio](https://github.com/pmndrs/valtio) (proxy-based global store) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| AI image generation | Hugging Face Inference API ([Kandinsky 2.1](https://huggingface.co/kandinsky-community/kandinsky-2-1)), called from a Next.js API route |
| Analytics | [nextjs-google-analytics](https://github.com/MauricioRobayo/nextjs-google-analytics) |

## Project Structure

```
pages/               Next.js routes
  index.tsx           Entry point — renders Home / Customizer
  api/v1/dalle/        API route that proxies prompts to the image-generation model
src/
  canvas/              3D scene: shirt model, camera rig, backdrop
  components/          UI building blocks (color picker, file picker, AI prompt panel, tabs, buttons)
  pages/               Home (landing) and Customizer (main editor) screens
  store/               Shared valtio state (garment color, active decals, texture flags)
  utils/               Constants, motion presets, helpers, types
public/
  shirt_baked.glb      3D garment asset
```

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn (repo ships a `yarn.lock`)

### Setup

```bash
yarn install
```

Create a `.env.local` file in the project root with your Hugging Face API token:

```bash
HF_API_TOKEN=hf_your_token_here
```

Get a free token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens). The token is read server-side only in the `/api/v1/dalle` route and is never exposed to the client.

### Run the dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
yarn build   # production build
yarn start   # run the production build
yarn lint    # lint the project
```

## Roadmap / Ideas

This started as a focused 3D customizer demo. Planned/considered expansions:

- Cart and checkout (Stripe) to make it a real e-commerce flow
- Persisted user designs and order history (Supabase)
- Multiple product types beyond the T-shirt (hoodie, mug, cap)
- Draggable/resizable decal placement on the 3D model
- Test coverage for state logic and core components

## License

Private project — no license specified.
