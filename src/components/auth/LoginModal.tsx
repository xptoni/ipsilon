import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Truck, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "role" | "login";
type Role = "shipper" | "carrier";

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
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
    // Simulate sending login link
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('loginModal.linkSent'));
    setIsLoading(false);
    onOpenChange(false);
    resetModal();
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('common.welcome') + "!");
    setIsLoading(false);
    onOpenChange(false);
    resetModal();
    
    // Navigate to appropriate dashboard
    if (selectedRole === "carrier") {
      navigate("/carrier-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const resetModal = () => {
    setStep("role");
    setSelectedRole(null);
    setEmail("");
    setPassword("");
    setShowPasswordLogin(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetModal();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-display text-xl">
            {step === "role" ? t('loginModal.title') : t('loginModal.loginAs', { role: selectedRole === 'shipper' ? t('loginModal.shipper') : t('loginModal.carrier') })}
          </DialogTitle>
        </DialogHeader>

        {step === "role" ? (
          <div className="grid grid-cols-2 gap-4 py-4">
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
        ) : (
          <div className="py-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('loginModal.back')}
            </button>

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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
