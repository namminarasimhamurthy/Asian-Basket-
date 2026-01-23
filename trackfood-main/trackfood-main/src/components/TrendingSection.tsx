import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const tags = [
    "Bombay Duck", "Basmati Rice", "Haldiram", "Turiya", "Tindoori",
    "Blue Crab", "Goat Meat", "Mutton", "Atta", "Biscuits",
    "Dal Chana", "Kantola", "Fresh Prawns", "Beef"
];

const TrendingSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef.current;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="bg-secondary/20 py-6 border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold uppercase whitespace-nowrap text-muted-foreground">Trending Now:</h3>

                    <div className="relative flex-1 group overflow-hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                            onClick={() => scroll('left')}
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>

                        <div
                            ref={scrollRef}
                            className="flex gap-2 overflow-x-auto scrollbar-hide px-8 items-center"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {tags.map((tag, idx) => (
                                <Link
                                    key={idx}
                                    to={`/search?q=${tag}`}
                                    className="whitespace-nowrap px-3 py-1 bg-white border border-border rounded-full text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors hover:shadow-sm"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => scroll('right')}
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingSection;
