import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Presentation, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Download
} from "lucide-react";

export default function DeckPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pitch Deck Builder</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Deck
        </Button>
      </div>

      <Tabs defaultValue="problem" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          
        </TabsList>

        <TabsContent value="problem" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Target className="h-5 w-5 text-red-600" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea 
                className="w-full min-h-[200px] p-4 rounded-md border"
                placeholder="Describe the problem your startup is solving..."
              />
              <Button className="w-full">Save & Continue</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would follow similar pattern */}
      </Tabs>
    </div>
  );
}