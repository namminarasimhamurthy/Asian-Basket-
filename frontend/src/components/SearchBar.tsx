import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <Input
                    type="text"
                    placeholder="Search for vegetables, fruits, meat..."
                    className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-primary/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-secondary/10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;
