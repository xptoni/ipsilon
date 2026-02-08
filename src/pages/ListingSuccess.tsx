import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Clock, Bell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const ListingSuccess = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get('id') || 'LST-XXXXXX';

  return (
    <Layout hideFooter>
      <div className="container max-w-2xl py-16">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              {t('success.title')}
            </h1>
            
            <p className="text-muted-foreground text-lg mb-6">
              {t('success.subtitle')}
            </p>

            <div className="inline-block px-4 py-2 bg-muted rounded-lg mb-8">
              <span className="text-sm text-muted-foreground">{t('success.listingId')}: </span>
              <span className="font-mono font-semibold text-foreground">{listingId}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{t('success.expectQuotes')}</p>
                  <p className="text-sm text-muted-foreground">{t('success.expectQuotesDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                <Bell className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{t('success.notifications')}</p>
                  <p className="text-sm text-muted-foreground">{t('success.notificationsDesc')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/shipper-dashboard">
                  {t('success.viewDashboard')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/create-listing">
                  {t('success.createAnother')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ListingSuccess;
