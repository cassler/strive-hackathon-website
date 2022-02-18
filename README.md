# Strive Summer Hackathon Website

## Stack

- Vite (Typescript/React)
- Tailwind3 for styling framework
- PostCSS (with extend, apply and nesting plugins)
- Jest for unit testing
- Github Workflows for C
- Vercel for CD

### Folder Structure

- `src/__test__` - is the home for test coverage.
- `src/assets` - static media such as media or binaries.
- `src/lib` - React components, template parts and custom libraries.
- `src/styles` - The only place to use CSS.

### Branding

Tailwind is preconfigured to provide color mappings for Strive brand colors with the usual scaling options.

- `brand-*`  - Branded hue of blue. (examples: `brand-100, brand-200, brand-300, etc...)
- `brand2-*` - Branded hue of green. (examples: `brand2-100, brand2-200, brand2-300, etc...)
- `brand3-*` - Branded hue of orange. (examples: `brand3-100, brand3-200, brand3-300, etc...)

### Authentication

The app is preconfigured with user access and authentication using Auth0.

To enable, simply provide your Auth0 ClientID and domain through the environment variable `VITE_AUTH0_CLIENTID` and `VITE_AUTH0_DOMAIN`.
