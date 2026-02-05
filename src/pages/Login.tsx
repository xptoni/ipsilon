import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Package, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Step = "role" | "login";
type Role = "shipper" | "carrier";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep("login");
  };

  const handleBack = () => {
    setStep("role");
    setSelectedRole(null);
    setShowPasswordLogin(false);
    setPassword("");
  };

  const handleSendLoginLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('loginModal.linkSent'));
    setIsLoading(false);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('common.welcome') + "!");
    setIsLoading(false);
    
    if (selectedRole === "carrier") {
      navigate("/carrier-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Ipsilon
            </span>
          </Link>

          {step === "role" ? (
            <>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                {t('loginModal.title')}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t('login.signInToContinue')}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleRoleSelect("shipper")}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{t('loginModal.shipper')}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t('loginModal.shipperDescription')}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("carrier")}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{t('loginModal.carrier')}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t('loginModal.carrierDescription')}
                    </div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('loginModal.back')}
              </button>

              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                {t('loginModal.loginAs', { role: selectedRole === 'shipper' ? t('loginModal.shipper') : t('loginModal.carrier') })}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t('login.signInToContinue')}
              </p>

              {!showPasswordLogin ? (
                <form onSubmit={handleSendLoginLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('loginModal.emailAddress')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    <Mail className="h-4 w-4" />
                    {isLoading ? t('loginModal.sending') : t('loginModal.sendLoginLink')}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    {t('loginModal.linkDescription')}
                  </p>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {t('loginModal.or')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPasswordLogin(true)}
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t('loginModal.usePassword')}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-password">{t('loginModal.emailAddress')}</Label>
                    <Input
                      id="email-password"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('login.signingIn') : t('common.signIn')}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setShowPasswordLogin(false)}
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t('loginModal.useMagicLink')}
                  </button>
                </form>
              )}
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('login.dontHaveAccount')}{" "}
            <Link to="/signup?type=carrier" className="text-primary font-medium hover:underline">
              {t('header.becomeCarrier')}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
              <Truck className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            {t('login.transportMadeSimple')}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {t('login.transportDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
