import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Edit2, Save, ArrowLeft, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const { user, updateUser, logout } = useAuth();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
    });

    const handleSave = () => {
        updateUser({
            name: formData.name,
            phone: formData.phone,
        });
        setIsEditing(false);
        toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    {/* Profile Card */}
                    <Card className="shadow-lg border-2">
                        <CardHeader className="text-center border-b">
                            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                                <span className="text-primary-foreground font-bold text-3xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <CardTitle className="text-2xl">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {/* Profile Info */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            value={user.email}
                                            disabled
                                            className="pl-10 bg-muted"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                onClick={handleSave}
                                                className="flex-1 bg-primary hover:bg-primary/90"
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        name: user.name,
                                                        phone: user.phone || '',
                                                    });
                                                }}
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="mt-8 pt-6 border-t space-y-3">
                                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-12"
                                    onClick={() => navigate('/orders')}
                                >
                                    <ShoppingBag className="h-5 w-5 mr-3" />
                                    My Orders
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Logout
                                </Button>
                            </div>

                            {/* Account Info */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-xs text-muted-foreground text-center">
                                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
