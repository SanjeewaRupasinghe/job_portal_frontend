import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required'),
  category: z.string().optional().or(z.literal('')),
  is_published: z.boolean().optional().default(false),
  display_order: z.number().optional().default(0),
});

type FAQFormData = z.infer<typeof faqSchema>;

const FAQManagement = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  const form = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
      category: '',
      is_published: false,
      display_order: 0,
    },
  });

  const loadFAQs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) setFaqs(data);
  };

  const onSubmit = async (data: FAQFormData) => {
    try {
      if (editingFAQ) {
        const { error } = await supabase.from('faqs').update(data).eq('id', editingFAQ.id);
        if (error) throw error;
        toast({ title: 'FAQ updated successfully!' });
      } else {
        const { error } = await supabase.from('faqs').insert(data);
        if (error) throw error;
        toast({ title: 'FAQ created successfully!' });
      }

      form.reset();
      setEditingFAQ(null);
      setActiveTab('manage');
      loadFAQs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEdit = (faq: any) => {
    setEditingFAQ(faq);
    form.setValue('question', faq.question);
    form.setValue('answer', faq.answer);
    form.setValue('category', faq.category || '');
    form.setValue('is_published', faq.is_published);
    form.setValue('display_order', faq.display_order);
    setActiveTab('create');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'FAQ deleted successfully!' });
      loadFAQs();
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = faqs.findIndex((f) => f.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[newIndex]] = [newFaqs[newIndex], newFaqs[index]];

    // Update display_order for both FAQs
    await supabase.from('faqs').update({ display_order: newIndex }).eq('id', faqs[index].id);
    await supabase.from('faqs').update({ display_order: index }).eq('id', faqs[newIndex].id);

    loadFAQs();
  };

  React.useEffect(() => {
    loadFAQs();
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">{editingFAQ ? 'Edit' : 'Create'} FAQ</TabsTrigger>
        <TabsTrigger value="manage">Manage FAQs</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>{editingFAQ ? 'Edit' : 'Create New'} FAQ</CardTitle>
            <CardDescription>Add frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter question" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter answer" rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., General, Account, Billing" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="display_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Lower numbers appear first</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publish</FormLabel>
                        <FormDescription>Make this FAQ visible to users</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit">{editingFAQ ? 'Update' : 'Create'} FAQ</Button>
                  {editingFAQ && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingFAQ(null);
                        form.reset();
                      }}
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>Manage FAQs</CardTitle>
            <CardDescription>View and manage all FAQs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                    {faq.category && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded mt-2 inline-block">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(faq.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(faq.id, 'down')}
                      disabled={index === faqs.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(faq)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {faqs.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No FAQs yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default FAQManagement;
