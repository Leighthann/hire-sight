"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Loader2,
  Save,
  User,
  Shield,
  Bell,
  Calendar,
  Mail,
  Download,
  Trash2,
  AlertTriangle,
  Lock,
  Globe,
  MessageSquare,
  Phone,
  Briefcase,
  Video,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SystemSettings() {
  const { user, isDemoMode } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [accountForm, setAccountForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    language: "english",
    timezone: "america_new_york",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    allowProfileIndexing: true,
  })

  const [communicationSettings, setCommunicationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    jobAlerts: true,
    weeklyDigest: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: true,
    outlookCalendar: false,
    gmail: true,
    outlook: false,
    slack: false,
    zoom: true,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleCommunicationChange = (key: string, checked: boolean) => {
    setCommunicationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleIntegrationChange = (key: string, checked: boolean) => {
    setIntegrationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Data export initiated",
        description:
          "Your data export has been initiated. You will receive an email with download instructions shortly.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error initiating your data export.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">System Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      {isDemoMode && (
        <Card className="bg-blue-900/30 border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-300">Demo Mode Active</h3>
                <p className="text-sm text-blue-400 mt-1">
                  Settings changes will not be persisted in demo mode. This is just a demonstration of the UI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="flex w-full flex-wrap sm:flex-nowrap bg-gray-800/50 border border-gray-700">
          <TabsTrigger
            value="account"
            className="flex items-center flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="flex items-center flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <Shield className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="flex items-center flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <Bell className="mr-2 h-4 w-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="flex items-center flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <Globe className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger
            value="data"
            className="flex items-center flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Account Information</CardTitle>
              <CardDescription className="text-gray-400">Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={accountForm.name}
                    onChange={handleAccountChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={accountForm.email}
                    onChange={handleAccountChange}
                    disabled={isDemoMode}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={accountForm.phone}
                    onChange={handleAccountChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-200">
                    Language
                  </Label>
                  <Select
                    value={accountForm.language}
                    onValueChange={(value) => setAccountForm((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-gray-200">
                  Timezone
                </Label>
                <Select
                  value={accountForm.timezone}
                  onValueChange={(value) => setAccountForm((prev) => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="america_new_york">America/New York (UTC-5)</SelectItem>
                    <SelectItem value="america_los_angeles">America/Los Angeles (UTC-8)</SelectItem>
                    <SelectItem value="america_chicago">America/Chicago (UTC-6)</SelectItem>
                    <SelectItem value="europe_london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="europe_paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="asia_tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Security</CardTitle>
              <CardDescription className="text-gray-400">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-200">Password</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="password"
                    value="••••••••••••"
                    disabled
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Change
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuth" className="flex-1 text-gray-200">
                    Two-Factor Authentication
                  </Label>
                  <Switch id="twoFactorAuth" checked={false} />
                </div>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-gradient-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Privacy Settings</CardTitle>
              <CardDescription className="text-gray-400">Control your privacy and visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profileVisibility" className="text-gray-200">
                  Profile Visibility
                </Label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-green-400" />
                        Public - Visible to everyone
                      </div>
                    </SelectItem>
                    <SelectItem value="connections">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-blue-400" />
                        Connections - Visible to connections only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-amber-400" />
                        Private - Visible only when you apply
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-200">Contact Information Visibility</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="showEmail" className="flex items-center text-gray-200">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        Show email to recruiters
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Allow recruiters to see your email address</p>
                    </div>
                    <Switch
                      id="showEmail"
                      checked={privacySettings.showEmail}
                      onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="showPhone" className="flex items-center text-gray-200">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        Show phone number
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Allow recruiters to see your phone number</p>
                    </div>
                    <Switch
                      id="showPhone"
                      checked={privacySettings.showPhone}
                      onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="allowMessaging" className="flex items-center text-gray-200">
                      <MessageSquare className="mr-2 h-4 w-4 text-gray-400" />
                      Allow messaging
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">Allow recruiters to send you messages</p>
                  </div>
                  <Switch
                    id="allowMessaging"
                    checked={privacySettings.allowMessaging}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMessaging", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="allowProfileIndexing" className="flex items-center text-gray-200">
                      <Globe className="mr-2 h-4 w-4 text-gray-400" />
                      Allow profile indexing
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">Allow search engines to index your public profile</p>
                  </div>
                  <Switch
                    id="allowProfileIndexing"
                    checked={privacySettings.allowProfileIndexing}
                    onCheckedChange={(checked) => handlePrivacyChange("allowProfileIndexing", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-gradient-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Communication Preferences</CardTitle>
              <CardDescription className="text-gray-400">Manage how we communicate with you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="emailNotifications" className="flex items-center text-gray-200">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        Email Notifications
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={communicationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleCommunicationChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="pushNotifications" className="flex items-center text-gray-200">
                        <Bell className="mr-2 h-4 w-4 text-gray-400" />
                        Push Notifications
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive notifications in your browser or mobile app</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={communicationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleCommunicationChange("pushNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="smsNotifications" className="flex items-center text-gray-200">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        SMS Notifications
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive notifications via text message</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={communicationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleCommunicationChange("smsNotifications", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Email Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="jobAlerts" className="flex items-center text-gray-200">
                        <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                        Job Alerts
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive alerts about new job opportunities</p>
                    </div>
                    <Switch
                      id="jobAlerts"
                      checked={communicationSettings.jobAlerts}
                      onCheckedChange={(checked) => handleCommunicationChange("jobAlerts", checked)}
                      disabled={!communicationSettings.emailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="weeklyDigest" className="flex items-center text-gray-200">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        Weekly Digest
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive a weekly summary of activity</p>
                    </div>
                    <Switch
                      id="weeklyDigest"
                      checked={communicationSettings.weeklyDigest}
                      onCheckedChange={(checked) => handleCommunicationChange("weeklyDigest", checked)}
                      disabled={!communicationSettings.emailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="marketingEmails" className="flex items-center text-gray-200">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        Marketing Emails
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive promotional emails and offers</p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={communicationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleCommunicationChange("marketingEmails", checked)}
                      disabled={!communicationSettings.emailNotifications}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-gradient-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Connected Services</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your connected services and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Calendar Integrations</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="googleCalendar" className="flex items-center text-gray-200">
                        <Calendar className="mr-2 h-4 w-4 text-red-400" />
                        Google Calendar
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Sync interviews and events with Google Calendar</p>
                    </div>
                    <Switch
                      id="googleCalendar"
                      checked={integrationSettings.googleCalendar}
                      onCheckedChange={(checked) => handleIntegrationChange("googleCalendar", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="outlookCalendar" className="flex items-center text-gray-200">
                        <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                        Outlook Calendar
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Sync interviews and events with Outlook Calendar</p>
                    </div>
                    <Switch
                      id="outlookCalendar"
                      checked={integrationSettings.outlookCalendar}
                      onCheckedChange={(checked) => handleIntegrationChange("outlookCalendar", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Email Integrations</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="gmail" className="flex items-center text-gray-200">
                        <Mail className="mr-2 h-4 w-4 text-red-400" />
                        Gmail
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Connect your Gmail account for seamless communication
                      </p>
                    </div>
                    <Switch
                      id="gmail"
                      checked={integrationSettings.gmail}
                      onCheckedChange={(checked) => handleIntegrationChange("gmail", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="outlook" className="flex items-center text-gray-200">
                        <Mail className="mr-2 h-4 w-4 text-blue-400" />
                        Outlook
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Connect your Outlook account for seamless communication
                      </p>
                    </div>
                    <Switch
                      id="outlook"
                      checked={integrationSettings.outlook}
                      onCheckedChange={(checked) => handleIntegrationChange("outlook", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Communication Tools</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="slack" className="flex items-center text-gray-200">
                        <MessageSquare className="mr-2 h-4 w-4 text-green-400" />
                        Slack
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Receive notifications and updates in Slack</p>
                    </div>
                    <Switch
                      id="slack"
                      checked={integrationSettings.slack}
                      onCheckedChange={(checked) => handleIntegrationChange("slack", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="zoom" className="flex items-center text-gray-200">
                        <Video className="mr-2 h-4 w-4 text-blue-400" />
                        Zoom
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">Automatically create Zoom meetings for interviews</p>
                    </div>
                    <Switch
                      id="zoom"
                      checked={integrationSettings.zoom}
                      onCheckedChange={(checked) => handleIntegrationChange("zoom", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-gradient-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Data Management</CardTitle>
              <CardDescription className="text-gray-400">Manage your data and account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Export Your Data</h4>
                <p className="text-sm text-gray-400">
                  Download a copy of your data including your profile, applications, and messages.
                </p>
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  disabled={isLoading}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </>
                  )}
                </Button>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-200">Account Closure</h4>
                <p className="text-sm text-gray-400">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently delete your account and remove all of your
                        data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

