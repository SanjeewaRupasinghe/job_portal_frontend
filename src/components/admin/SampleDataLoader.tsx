import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';

export function SampleDataLoader() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadSampleData = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('insert_sample_data');

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Sample data loaded successfully! Check your Resumes tab and Messages.',
      });
    } catch (error) {
      console.error('Error loading sample data:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load sample data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Load Sample Data
          </h3>
          <p className="text-sm text-muted-foreground">
            Load sample resumes and chat messages for testing the UI
          </p>
        </div>

        <Button onClick={loadSampleData} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            'Load Sample Data'
          )}
        </Button>
      </div>
    </Card>
  );
}
