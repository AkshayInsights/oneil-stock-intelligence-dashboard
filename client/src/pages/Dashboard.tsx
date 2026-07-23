import { stocks } from "@/lib/stock-data";
import { marketRegime } from "@/lib/market-regime";
import { Header } from "@/components/Header";
import { MarketRegimeBanner } from "@/components/MarketRegimeBanner";
import { StockCard } from "@/components/StockCard";
import { Disclaimer } from "@/components/Disclaimer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <div className="pt-1">
          <h1 className="font-display text-xl font-bold text-foreground" data-testid="text-page-title">
            Today&apos;s Growth Stock Intelligence
          </h1>
        </div>

        <MarketRegimeBanner regime={marketRegime} />

        <Carousel
          opts={{ align: "start", slidesToScroll: 1 }}
          className="px-2 sm:px-10"
          data-testid="carousel-stocks"
        >
          <CarouselContent>
            {stocks.map((stock) => (
              <CarouselItem
                key={stock.ticker}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <StockCard stock={stock} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious data-testid="button-carousel-prev" />
          <CarouselNext data-testid="button-carousel-next" />
        </Carousel>

        <Disclaimer />
      </main>
    </div>
  );
}
