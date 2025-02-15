"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"

export default function IdeaValidationPage() {
  const [ideaDetails, setIdeaDetails] = useState({
    startupName: "",
    problemStatement: "",
    targetAudience: "",
    businessModel: "",
  })
  const [analysis, setAnalysis] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setIdeaDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically make an API call to your AI service
    // For demonstration, we'll use mock data
    const mockAnalysis = {
      viabilityScore: 75,
      marketResearch: "The target market shows significant growth potential...",
      competitorAnalysis: "Main competitors include X, Y, and Z...",
      businessRecommendations: "Consider focusing on unique value proposition...",
      swot: {
        strengths: ["Innovative solution", "Strong team"],
        weaknesses: ["Limited initial funding", "New to market"],
        opportunities: ["Growing market demand", "Potential partnerships"],
        threats: ["Established competitors", "Regulatory challenges"],
      },
    }
    setAnalysis(mockAnalysis)
  }

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("Downloading PDF...")
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Idea Validation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Idea Input Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startupName">Startup Name</Label>
              <Input
                id="startupName"
                name="startupName"
                value={ideaDetails.startupName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="problemStatement">Problem Statement</Label>
              <Textarea
                id="problemStatement"
                name="problemStatement"
                value={ideaDetails.problemStatement}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={ideaDetails.targetAudience}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessModel">Business Model</Label>
              <Textarea
                id="businessModel"
                name="businessModel"
                value={ideaDetails.businessModel}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Generate Analysis
            </Button>
          </CardContent>
        </Card>
      </form>

      {analysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Idea Viability Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">{analysis.viabilityScore}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Research & Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.marketResearch}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.competitorAnalysis}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analysis.businessRecommendations}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SWOT Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strengths</TableHead>
                    <TableHead>Weaknesses</TableHead>
                    <TableHead>Opportunities</TableHead>
                    <TableHead>Threats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ul>
                        {analysis.swot.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {analysis.swot.weaknesses.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {analysis.swot.opportunities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {analysis.swot.threats.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Button onClick={handleDownloadPDF} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download PDF Report
          </Button>
        </div>
      )}
    </div>
  )
}

