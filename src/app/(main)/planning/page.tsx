import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  BarChart, 
  PieChart,
  Download 
} from "lucide-react";

export default function PlanningPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Planning</h1>
        <div className="flex gap-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Plan
          </Button>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Update Projections
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Revenue Projections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Q1 2024</TableCell>
                  <TableCell>$0</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Development</TableCell>
                  <TableCell>$0</TableCell>
                  <TableCell>0%</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}