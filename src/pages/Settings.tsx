import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Key,
  Globe,
  Clock,
  CreditCard,
  Activity,
  PenSquare,
  Save,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("account");
  const { toast } = useToast();
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application settings</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-4">
          <Card>
            <CardContent className="p-4">
              <Tabs 
                orientation="vertical" 
                value={currentTab} 
                onValueChange={setCurrentTab}
                className="space-y-4"
              >
                <TabsList className="flex flex-col h-auto w-full items-stretch space-y-1 rounded-md bg-muted p-1">
                  <TabsTrigger 
                    value="account" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Account</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="api" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>API Connections</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="workflow" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    <span>Workflow</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="justify-start px-3 py-2 text-left"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Billing</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Need help?</p>
                  <p className="text-muted-foreground">Check our documentation or contact support.</p>
                </div>
                <Button variant="outline" className="w-full">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Tabs value={currentTab} onValueChange={setCurrentTab} orientation="vertical">
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="form-control w-full">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="form-control w-full">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input id="company" defaultValue="Acme Inc." />
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="timeZone">Time Zone</Label>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger id="timeZone">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Profile Picture</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">Upload</Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG, or GIF. 1MB max.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Account Preferences</h3>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="marketing">Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about new features and promotional offers</p>
                      </div>
                      <Switch id="marketing" defaultChecked />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Receive our monthly newsletter with industry updates</p>
                      </div>
                      <Switch id="newsletter" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={saveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="publish-notify">Content publishing</Label>
                        <p className="text-sm text-muted-foreground">Notifications for when your content is published</p>
                      </div>
                      <Switch id="publish-notify" defaultChecked />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="engagement-notify">Engagement milestones</Label>
                        <p className="text-sm text-muted-foreground">Get alerts when your content reaches engagement milestones</p>
                      </div>
                      <Switch id="engagement-notify" defaultChecked />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="comment-notify">Comments and mentions</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone comments on or mentions your content</p>
                      </div>
                      <Switch id="comment-notify" />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="workflow-notify">Workflow notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified about automation workflow executions</p>
                      </div>
                      <Switch id="workflow-notify" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Application Notifications</h3>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="in-app-notify">In-app notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                      </div>
                      <Switch id="in-app-notify" defaultChecked />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="browser-notify">Browser notifications</Label>
                        <p className="text-sm text-muted-foreground">Show browser push notifications when events occur</p>
                      </div>
                      <Switch id="browser-notify" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={saveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    
                    <div className="form-control">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <Button variant="outline">Update Password</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Session Management</h3>
                    <p className="text-sm text-muted-foreground">Manage your active sessions and sign out from other devices</p>
                    
                    <div className="space-y-2">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 198.51.100.42</p>
                          </div>
                          <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Active</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Safari on MacBook</p>
                            <p className="text-xs text-muted-foreground">Last active: 2 days ago • IP: 198.51.100.10</p>
                          </div>
                          <Button variant="outline" size="sm">Sign Out</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline">Sign Out All Other Devices</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>API Connections</CardTitle>
                  <CardDescription>
                    Connect your social media accounts and other services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Social Media Connections</h3>
                    
                    <div className="space-y-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-facebook flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-xs text-muted-foreground">Connected as John Doe</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-instagram flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                            </div>
                            <div>
                              <p className="font-medium">Instagram</p>
                              <p className="text-xs text-muted-foreground">Connected as @johndoe</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-twitter flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </div>
                            <div>
                              <p className="font-medium">Twitter</p>
                              <p className="text-xs text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-linkedin flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </div>
                            <div>
                              <p className="font-medium">LinkedIn</p>
                              <p className="text-xs text-muted-foreground">Connected as John Doe</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Ad Platform Connections</h3>
                    
                    <div className="space-y-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-meta flex items-center justify-center mr-3">
                              <PenSquare className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Meta Ads</p>
                              <p className="text-xs text-muted-foreground">Connected to Business Account</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg network-google flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5"><path d="M12 22L2 12 12 2M22 12H2M17 7l-5 5M17 17l-5-5"></path></svg>
                            </div>
                            <div>
                              <p className="font-medium">Google Ads</p>
                              <p className="text-xs text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">API Keys</h3>
                    
                    <div className="form-control">
                      <Label htmlFor="api-key">Your API Key</Label>
                      <div className="flex gap-2">
                        <Input id="api-key" defaultValue="sk_live_1a2b3c4d5e6f7g8h9i0j" readOnly />
                        <Button variant="outline">Copy</Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Use this key to access our API from your applications</p>
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="Enter your webhook URL" />
                      <p className="text-xs text-muted-foreground mt-1">We'll send event notifications to this URL</p>
                    </div>
                    
                    <Button variant="outline">Generate New API Key</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workflow" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Automation</CardTitle>
                  <CardDescription>
                    Configure automation workflows for content publishing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="form-control">
                      <Label htmlFor="n8n-webhook">n8n Webhook URL</Label>
                      <Input id="n8n-webhook" placeholder="Enter your n8n webhook URL" />
                      <p className="text-xs text-muted-foreground mt-1">Connect your n8n workflows to automate content publishing</p>
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="auto-publish">Auto-publish to social media</Label>
                        <p className="text-sm text-muted-foreground">Automatically publish content to connected platforms</p>
                      </div>
                      <Switch id="auto-publish" />
                    </div>
                    
                    <div className="form-control flex flex-row items-center justify-between space-y-0">
                      <div>
                        <Label htmlFor="auto-schedule">Auto-schedule content</Label>
                        <p className="text-sm text-muted-foreground">Automatically schedule content for optimal engagement times</p>
                      </div>
                      <Switch id="auto-schedule" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Scheduling Preferences</h3>
                    
                    <div className="form-control">
                      <Label htmlFor="default-time">Default Publishing Time</Label>
                      <Select defaultValue="9">
                        <SelectTrigger id="default-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">9:00 AM</SelectItem>
                          <SelectItem value="10">10:00 AM</SelectItem>
                          <SelectItem value="12">12:00 PM</SelectItem>
                          <SelectItem value="15">3:00 PM</SelectItem>
                          <SelectItem value="18">6:00 PM</SelectItem>
                          <SelectItem value="20">8:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">Default time for scheduled posts</p>
                    </div>
                    
                    <div className="form-control">
                      <Label htmlFor="timezone">Timezone for Scheduling</Label>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={saveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-md p-4 bg-primary/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">Your subscription renews on Oct 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">Change Plan</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Monthly Price</p>
                        <p className="text-muted-foreground">$49/month</p>
                      </div>
                      <div>
                        <p className="font-medium">Billing Cycle</p>
                        <p className="text-muted-foreground">Monthly</p>
                      </div>
                      <div>
                        <p className="font-medium">Next Billing Date</p>
                        <p className="text-muted-foreground">Oct 15, 2023</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 04/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Billing History</h3>
                    
                    <div className="border rounded-md divide-y">
                      {[
                        { date: "Sep 15, 2023", amount: "$49.00", status: "Paid" },
                        { date: "Aug 15, 2023", amount: "$49.00", status: "Paid" },
                        { date: "Jul 15, 2023", amount: "$49.00", status: "Paid" }
                      ].map((invoice, index) => (
                        <div key={index} className="flex justify-between items-center p-3">
                          <div>
                            <p className="font-medium">Invoice #{20230900 + index + 1}</p>
                            <p className="text-xs text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-medium">{invoice.amount}</p>
                            <div className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              {invoice.status}
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
