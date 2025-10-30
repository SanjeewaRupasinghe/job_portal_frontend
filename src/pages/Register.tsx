import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Phone, Briefcase, Building2 } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        user_type: userType
      });
      console.log(error);
      if (error) {
        setErrors(error);
      } else {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Join FindJobOffer</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>

        <Card className="shadow-soft-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Choose your account type and fill in your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="candidate" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="candidate" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Job Seeker</span>
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Employer</span>
                </TabsTrigger>
              </TabsList>

              {["candidate", "employer"].map((userType) => (
                <TabsContent key={userType} value={userType} className="space-y-4 mt-6">
                  <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`firstName-${userType}`}>First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`firstName-${userType}`}
                            placeholder="John"
                            value={formData.first_name}
                            onChange={(e) => handleInputChange("first_name", e.target.value)}
                            className="pl-10"
                          />
                           {errors.first_name && (
                          <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                        )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`lastName-${userType}`}>Last Name</Label>
                        <Input
                          id={`lastName-${userType}`}
                          placeholder="Doe"
                          value={formData.last_name}
                          onChange={(e) => handleInputChange("last_name", e.target.value)}
                        />
                        {errors.last_name && (
                          <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`email-${userType}`}>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`email-${userType}`}
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`phone-${userType}`}>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`phone-${userType}`}
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`password-${userType}`}>Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`password-${userType}`}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`confirmPassword-${userType}`}>Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`confirmPassword-${userType}`}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id={`terms-${userType}`}
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                          required
                        />
                        <Label htmlFor={`terms-${userType}`} className="text-sm leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id={`marketing-${userType}`}
                          checked={formData.agreeToMarketing}
                          onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked === true)}
                        />
                        <Label htmlFor={`marketing-${userType}`} className="text-sm leading-relaxed">
                          I'd like to receive job alerts and career tips via email
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover"
                      disabled={!formData.agreeToTerms || loading}
                    >
                      {loading ? "Creating Account..." : `Create ${userType === "candidate" ? "Job Seeker" : "Employer"} Account`}
                    </Button>
                  </form>

                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}