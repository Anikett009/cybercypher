import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, BookOpen, Users, Wallet } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to VenturePilot</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <BarChart2 className="h-5 w-5 text-green-600" />
              Idea Validation Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Validate your startup idea with our comprehensive tools
            </p>
            <Button asChild>
              <Link href="/validation" className="flex items-center gap-x-2">
                Start Validation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <BarChart2 className="h-5 w-5 text-green-600" />
              Elevator Pitch Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get started with your pitch right away!
            </p>
            <Button asChild>
              <Link href="/elevatorpitch" className="flex items-center gap-x-2">
                Start Building <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Pitch Deck Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a compelling pitch deck for investors
            </p>
            <Button asChild>
              <Link href="/deck" className="flex items-center gap-x-2">
                Build Deck <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <Wallet className="h-5 w-5 text-purple-600" />
              Financial Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Plan your startup finances and projections
            </p>
            <Button asChild>
              <Link href="/planning" className="flex items-center gap-x-2">
                Start Planning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              Investor Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find and connect with potential investors
            </p>
            <Button asChild>
              <Link href="/match" className="flex items-center gap-x-2">
                Find Investors <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <BarChart2 className="h-5 w-5 text-green-600" />
              Task Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Automate your tasks using our agents
            </p>
            <Button asChild>
              <Link href="/automation" className="flex items-center gap-x-2">
                Start Automation  <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}