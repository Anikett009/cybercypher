import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Building2,
  MapPin,
  DollarSign
} from "lucide-react";

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investor Matching</h1>
        <Button>
          Update Profile
        </Button>
      </div>

      <div className="flex gap-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search investors..." 
              className="pl-9"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Example Investor Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Venture Capital Firm
              </span>
              <Badge>Series A</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              Investment Range: $1M - $5M
            </div>
            <p className="text-sm">
              Focuses on B2B SaaS, AI/ML, and Enterprise Software
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">SaaS</Badge>
              <Badge variant="secondary">AI</Badge>
              <Badge variant="secondary">Enterprise</Badge>
            </div>
            <Button className="w-full">View Profile</Button>
          </CardContent>
        </Card>

        {/* Add more investor cards as needed */}
      </div>
    </div>
  );
}