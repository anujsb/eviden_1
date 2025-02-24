"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface Review {
  author: string;
  text: string;
  rating: number;
}

interface Alumni {
  id: number;
  name: string;
  image: string;
  company: string;
  role: string;
  graduationYear: number;
  location: string;
  email: string;
  linkedin: string;
  experience: Experience[];
  skills: string[];
  reviews: Review[];
}

interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sample alumni data
  const alumniData: Alumni[] = [
    {
      id: 1,
      name: "Anuj Bhuyar",
      image: "favicon.ico",
      company: "Eviden",
      role: "Senior Software Engineer",
      graduationYear: 2018,
      location: "SF, CA",
      email: "Anuj.Bhuyar@eviden.com",
      linkedin: "linkedin.com/Anuj",
      experience: [
        {
          company: "Eviden",
          role: "Senior Software Engineer",
          duration: "2020-Present",
        },
        {
          company: "Microsoft",
          role: "Software Engineer",
          duration: "2018-2020",
        },
      ],
      skills: ["React", "Node.js", "Python", "Cloud Architecture"],
      reviews: [
        {
          author: "Anuj Bhuyar",
          text: "Great company",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Aadarsh",
      image: "favicon.ico",
      company: "Amazon",
      role: "Product Manager",
      graduationYear: 2019,
      location: "Pune, IND",
      email: "Aadarsh.w@example.com",
      linkedin: "linkedin.com/Aadarsh",
      experience: [
        {
          company: "Amazon",
          role: "Product Manager",
          duration: "2021-Present",
        },
        {
          company: "Apple",
          role: "Associate PM",
          duration: "2019-2021",
        },
      ],
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Research"],
      reviews: [
        {
          author: "Aadarsh",
          text: "Great company.",
          rating: 5,
        },
      ],
    },
  ];

  const filteredAlumni = alumniData.filter(
    (alumni) =>
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img
                src={alumni.image}
                alt={alumni.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <CardTitle className="text-xl">{alumni.name}</CardTitle>
                <CardDescription>
                  {alumni.role} at {alumni.company}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {alumni.skills.slice(0, 3).map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{alumni.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={alumni.image}
                  alt={alumni.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">{alumni.role}</h3>
                  <p className="text-gray-600">{alumni.company}</p>
                  <p className="text-gray-600">{alumni.location}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p>Email: {alumni.email}</p>
                <p>LinkedIn: {alumni.linkedin}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex gap-2 flex-wrap">
                  {alumni.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4">
            <div className="space-y-4">
              {alumni.experience.map((exp: Experience, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{exp.role}</CardTitle>
                    <CardDescription>
                      {exp.company} • {exp.duration}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {alumni.reviews.map((review: Review, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="mb-2">{review.text}</p>
                    <p className="text-sm text-gray-600">- {review.author}</p>
                    <div className="flex mt-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search by name, company, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumni) => (
          <AlumniCard key={alumni.id} alumni={alumni} />
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;
