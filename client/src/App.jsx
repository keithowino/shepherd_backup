import { useState } from "react";
import { AnimeGrid } from "@/components/ui/custom/AnimeGrid";
import { SeriesView } from "@/components/ui/custom/SeriesView";

const App = () => {
  const [seriesId, setSeriesId] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 space-y-6">
        <h1 className="uppercase p-5 bg-primary rounded-xl text-center text-primary-foreground">
          Anime Test
        </h1>

        {seriesId == null ? (
          <AnimeGrid onSelect={setSeriesId} />
        ) : (
          <SeriesView id={seriesId} onBack={() => setSeriesId(null)} />
        )}
      </div>
    </div>
  );
};

export default App;