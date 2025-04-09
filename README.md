# Hot Box Backend

This repository serves as the backend for Hot Box.

## Custom Packages

I've changed the way I share code with my frontend and backend.

I used to have a monorepo with a shared folder that both my frontend and backend could import from.

Now, I'm using GitHub packages to share code with the frontend and backend. I can install those packages with npm as dependencies and by doing it this way, I can easily have the frontend and backend separated while still allowing them to use shared code.