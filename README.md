# Hot Box Backend

This repository serves as the backend for Hot Box.

## Custom Packages

I've changed the way I share code with my frontend and backend.

I used to have a monorepo with a shared folder that both my frontend and backend could import from.

Now, I'm using GitHub packages to share code with the frontend and backend. I can install those packages with npm as dependencies and by doing it this way, I can easily have the frontend and backend separated while still allowing them to use shared code.

# Indexing

After creating a few npm packages, I learned a few things about importing and exporing stuff...

- I learned that I should create an `index.ts` file in each folder and export everything within those folders from that file. By doing that, I can easily export everything in the whole package from the `index.ts` file in the root folder, and when it comes to exporting the contents of a folder, everything in that folder should already be exported from its `index.ts` file, so I can export everything in a subfolder by simply referencing the folder.

- I learned that I should export everything with `*` rather than exporting everything by their names. When I got around to importing my packages in my app, I realized that almost everything I could import had the same little icon next to it, and that each one of those things was an alias. In other words, there was no distinction between constants, functions, and types at a glance when looking through the list of available imports. By simply writing my exports like `export * from "./some-file"` or `export * from "./some-folder"` in all of my `index.ts` files, that problem was fixed and it's honestly easier to do it like that rather than writing out the names of everything I would be exporting. When looking through the list of imports after doing it that way, my constants, functions, types, etc. had different icons with different colors next them and it was much easier to distinguish them.

- I've decided to take on a similar approach in my app and it's working nicely so far. I no longer have to write out the names of whatever function or constant I'm trying to import in the main portion of my app, but I have ran into one issue/concern. For folder-based naming, like how I structure my routers folder, I would need to defined each router in an `index.ts` file so I can reference it by its folder name, so that means those `index.ts` files would be used in a different way. It makes sense, but it's different. However, it's okay and there's no real issue for one reason... I don't want nested imports in my routers folder. If I have a router in a router, I wouldn't need to import that router anywhere other than the parent router, because its parent router is the only place it would ever be referenced. For the main/primary/api router, I would import it in my `server.ts` file and it would already have all of the subrouters linked to it.