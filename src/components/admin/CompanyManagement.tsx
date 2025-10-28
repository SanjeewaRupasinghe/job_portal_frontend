import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  size: string;
  is_verified: boolean;
  job_posts: number;
  founded: string;
}

// Dummy company data for testing
const DUMMY_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 100-2000',
    location: 'San Francisco, CA',
    size: '500-1000',
    is_verified: true,
    job_posts: 12,
    founded: '2015'
  },
  {
    id: '2',
    name: 'StartupXYZ',
    email: 'hello@startupxyz.com',
    phone: '+1 (555) 200-3000',
    location: 'Austin, TX',
    size: '50-100',
    is_verified: true,
    job_posts: 8,
    founded: '2020'
  },
  {
    id: '3',
    name: 'Innovation Labs',
    email: 'info@innovationlabs.io',
    phone: '+1 (555) 300-4000',
    location: 'Boston, MA',
    size: '100-250',
    is_verified: false,
    job_posts: 3,
    founded: '2022'
  },
  {
    id: '4',
    name: 'Digital Solutions Co.',
    email: 'contact@digitalsolutions.com',
    phone: '+1 (555) 400-5000',
    location: 'Seattle, WA',
    size: '250-500',
    is_verified: true,
    job_posts: 15,
    founded: '2018'
  },
];

const CompanyManagement = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCompanies(DUMMY_COMPANIES);
  }, []);

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleVerification = (companyId: string) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, is_verified: !company.is_verified }
        : company
    ));
    const company = companies.find(c => c.id === companyId);
    toast({
      title: company?.is_verified ? "Company Unverified" : "Company Verified",
      description: `${company?.name} has been ${company?.is_verified ? 'unverified' : 'verified'}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Management</CardTitle>
        <CardDescription>Manage company profiles and verification status</CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Job Posts</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.size}</TableCell>
                <TableCell>{company.job_posts}</TableCell>
                <TableCell>
                  <Badge variant={company.is_verified ? 'default' : 'secondary'}>
                    {company.is_verified ? 'Verified' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVerification(company.id)}
                    >
                      {company.is_verified ? (
                        <XCircle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCompanies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No companies found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyManagement;
