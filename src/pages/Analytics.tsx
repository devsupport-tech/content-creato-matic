
import { useState } from "react";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for charts
const engagementData = [
  { name: "Jan", facebook: 4000, instagram: 2400, twitter: 1800, linkedin: 3200 },
  { name: "Feb", facebook: 3000, instagram: 1398, twitter: 2800, linkedin: 2500 },
  { name: "Mar", facebook: 2000, instagram: 9800, twitter: 2200, linkedin: 1900 },
  { name: "Apr", facebook: 2780, instagram: 3908, twitter: 2000, linkedin: 2600 },
  { name: "May", facebook: 1890, instagram: 4800, twitter: 2181, linkedin: 2400 },
  { name: "Jun", facebook: 2390, instagram: 3800, twitter: 2500, linkedin: 3100 },
  { name: "Jul", facebook: 3490, instagram: 4300, twitter: 2100, linkedin: 3700 }
];

const audienceData = [
  { name: "18-24", value: 20 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 5 }
];

const AUDIENCE_COLORS = ["#8B5CF6", "#0EA5E9", "#3B82F6", "#6366F1", "#A855F7"];

const performanceData = [
  { name: "Mon", impressions: 1200, clicks: 240, conversions: 20 },
  { name: "Tue", impressions: 1400, clicks: 280, conversions: 24 },
  { name: "Wed", impressions: 1800, clicks: 360, conversions: 32 },
  { name: "Thu", impressions: 2200, clicks: 440, conversions: 40 },
  { name: "Fri", impressions: 2600, clicks: 520, conversions: 52 },
  { name: "Sat", impressions: 1800, clicks: 360, conversions: 30 },
  { name: "Sun", impressions: 1200, clicks: 240, conversions: 22 }
];

// Platform data
const platformData = [
  { name: "Facebook", followers: 12500, engagement: 3.2, posts: 45 },
  { name: "Instagram", followers: 24800, engagement: 4.7, posts: 62 },
  { name: "Twitter", followers: 8700, engagement: 2.1, posts: 87 },
  { name: "LinkedIn", followers: 5200, engagement: 1.8, posts: 28 },
  { name: "TikTok", followers: 15600, engagement: 6.3, posts: 34 },
  { name: "YouTube", followers: 3800, engagement: 2.9, posts: 12 }
];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [currentTab, setCurrentTab] = useState("overview");
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your content performance across platforms</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Engagements</p>
                <p className="text-3xl font-bold">48.3k</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
              </span>
              <span className="text-muted-foreground ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Impressions</p>
                <p className="text-3xl font-bold">192k</p>
              </div>
              <div className="bg-accent/10 p-2 rounded-full">
                <LineChart className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 18%
              </span>
              <span className="text-muted-foreground ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Click Rate</p>
                <p className="text-3xl font-bold">5.2%</p>
              </div>
              <div className="bg-purple-500/10 p-2 rounded-full">
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 2.1%
              </span>
              <span className="text-muted-foreground ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold">1.8%</p>
              </div>
              <div className="bg-blue-500/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" /> 0.5%
              </span>
              <span className="text-muted-foreground ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Engagement Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
                    <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
                    <Bar dataKey="twitter" name="Twitter" fill="#1DA1F2" />
                    <Bar dataKey="linkedin" name="LinkedIn" fill="#0A66C2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="impressions" name="Impressions" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#0EA5E9" />
                    <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="#10B981" />
                  </RechartLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audience Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={AUDIENCE_COLORS[index % AUDIENCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          Top Performing Post #{item}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>2.4k engagements</span>
                          <span className="mx-2">•</span>
                          <span>12k impressions</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="platforms" className="space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformData.map((platform) => (
              <Card key={platform.name}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center network-${platform.name.toLowerCase()}`}>
                        {platform.name === "Facebook" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                        {platform.name === "Instagram" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>}
                        {platform.name === "Twitter" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>}
                        {platform.name === "LinkedIn" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                        {platform.name === "TikTok" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"></path><path d="M10 12a3 3 0 1 1-3-3"></path><path d="M17 9v8a3 3 0 0 1-3 3"></path><path d="M9 13v-3a3 3 0 0 1 3-3h5"></path></svg>}
                        {platform.name === "YouTube" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>}
                      </div>
                      <h3 className="text-lg font-semibold ml-2">{platform.name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="text-2xl font-bold">{platform.followers.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                        <p className="text-lg font-semibold">{platform.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Posts</p>
                        <p className="text-lg font-semibold">{platform.posts}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={AUDIENCE_COLORS[index % AUDIENCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", percentage: 42 },
                    { country: "United Kingdom", percentage: 18 },
                    { country: "Canada", percentage: 12 },
                    { country: "Australia", percentage: 8 },
                    { country: "Germany", percentage: 6 },
                    { country: "Other", percentage: 14 }
                  ].map((item) => (
                    <div key={item.country} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.country}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium">Content</th>
                      <th className="pb-3 font-medium">Platform</th>
                      <th className="pb-3 font-medium">Published</th>
                      <th className="pb-3 font-medium text-right">Impressions</th>
                      <th className="pb-3 font-medium text-right">Engagement</th>
                      <th className="pb-3 font-medium text-right">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { id: 1, title: "New Product Launch", platform: "Facebook", date: "2023-09-15", impressions: 24500, engagement: 3200, ctr: 4.2 },
                      { id: 2, title: "Company Milestone Post", platform: "LinkedIn", date: "2023-09-12", impressions: 18700, engagement: 2400, ctr: 3.8 },
                      { id: 3, title: "Team Culture Video", platform: "Instagram", date: "2023-09-10", impressions: 32600, engagement: 5800, ctr: 6.5 },
                      { id: 4, title: "Industry Insights", platform: "Twitter", date: "2023-09-08", impressions: 15200, engagement: 1800, ctr: 2.9 },
                      { id: 5, title: "Customer Success Story", platform: "YouTube", date: "2023-09-05", impressions: 8400, engagement: 1200, ctr: 3.4 },
                    ].map((content) => (
                      <tr key={content.id} className="h-12">
                        <td className="font-medium">{content.title}</td>
                        <td>{content.platform}</td>
                        <td>{new Date(content.date).toLocaleDateString()}</td>
                        <td className="text-right">{content.impressions.toLocaleString()}</td>
                        <td className="text-right">{content.engagement.toLocaleString()}</td>
                        <td className="text-right">{content.ctr}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
