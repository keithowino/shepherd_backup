import { AppProviders, AppRouter } from "./app/index.js";

export default function App() {
	return (
		<AppProviders>
      <div className="min-h-screen">
        <div className="container mx-auto py-8 px-4 space-y-6">
          <h1 className="uppercase p-5 bg-primary rounded-xl text-primary-foreground">
            SHEPHERD
          </h1>
          <AppRouter />
        </div>
      </div>
		</AppProviders>
	);
}