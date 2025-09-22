import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FileText, Image, Video, Mic, ArrowRight, CheckCircle, Star, Users, Clock, Shield, Crown, Zap } from 'lucide-react';
import { PRICING_PLANS, formatPrice, trackPageVisit } from '../utils/pricing';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

export default function Home() {
  const [activeService, setActiveService] = useState('blog');
  const [user] = useAuthState(auth);

  // Track page visit for monetization
  useEffect(() => {
    trackPageVisit(user?.uid, 'home');
  }, [user]);

  const services = [
    {
      id: 'blog-writing',
      name: 'Content Writing',
      icon: FileText,
      description: 'Professional AI-powered blog posts and articles that engage your audience',
      features: ['SEO Optimized', 'Up to 50 posts/month', 'Multiple Formats', '24hr Delivery'],
      price: formatPrice(PRICING_PLANS['blog-writing'].price) + '/month',
      color: 'text-blue-600'
    },
    {
      id: 'graphics-design',
      name: 'Graphics Design',
      icon: Image,
      description: 'Stunning visuals and graphics created with AI technology',
      features: ['Custom Designs', 'Up to 100 graphics/month', 'High Resolution', 'Commercial Use'],
      price: formatPrice(PRICING_PLANS['graphics-design'].price) + '/month',
      color: 'text-green-600'
    },
    {
      id: 'video-editing',
      name: 'Video Editing',
      icon: Video,
      description: 'Professional video editing and production services',
      features: ['Up to 20 videos/month', 'Professional Editing', 'HD Quality', 'Custom Effects'],
      price: formatPrice(PRICING_PLANS['video-editing'].price) + '/month',
      color: 'text-purple-600'
    },
    {
      id: 'voiceover',
      name: 'Voiceover Services',
      icon: Mic,
      description: 'Natural-sounding AI voiceovers in multiple languages',
      features: ['Up to 30 voiceovers/month', 'Multiple Languages', 'Studio Quality', 'Commercial Rights'],
      price: formatPrice(PRICING_PLANS['voiceover'].price) + '/month',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Happy Clients', value: '1,000+', icon: Users },
    { label: 'Projects Completed', value: '5,000+', icon: CheckCircle },
    { label: 'Average Delivery', value: '24 Hours', icon: Clock },
    { label: 'Success Rate', value: '99%', icon: Star }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content: 'The AI-generated content exceeded our expectations. Quality is outstanding and delivery is lightning fast.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Content Creator',
      company: 'Digital Media Co.',
      content: 'Amazing service! The blog posts are well-researched and perfectly match our brand voice.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Small Business Owner',
      company: 'Local Bakery',
      content: 'Affordable, professional, and quick. Exactly what my business needed for social media content.',
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>AI Digital Agency - Professional AI Content Creation Services</title>
        <meta name="description" content="Transform your business with AI-powered content creation. Get high-quality blogs, graphics, videos, and voiceovers delivered fast." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Transform Your Business with
              <span className="block text-yellow-300">AI-Powered Content</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
              Get professional blogs, stunning graphics, engaging videos, and natural voiceovers 
              created by advanced AI technology in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/signup" className="bg-yellow-400 text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
                Get Started Free
              </Link>
              <Link href="#services" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our AI-Powered Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of professional content creation services, 
              all powered by cutting-edge artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                    activeService === service.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveService(service.id)}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-semibold text-primary-600 mb-4">{service.price}</div>
                  <Link href="/signup" className="w-full btn-primary text-center block">
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get professional content in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Service</h3>
              <p className="text-gray-600">
                Select from blog writing, graphics, video, or voiceover services based on your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Provide Details</h3>
              <p className="text-gray-600">
                Fill out a simple form with your requirements, preferences, and any specific instructions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Your Content</h3>
              <p className="text-gray-600">
                Receive your high-quality, AI-generated content within 24 hours or less.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who trust us with their content needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your content needs. All plans include unlimited revisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(PRICING_PLANS).filter(([key]) => key !== 'complete-package').map(([key, plan]) => (
              <div key={key} className={`bg-white rounded-lg shadow-lg border-2 ${plan.popular ? 'border-primary-500' : 'border-gray-200'} p-8 relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {formatPrice(plan.price)}
                    <span className="text-lg text-gray-500 font-normal">/{plan.billing}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/signup" 
                  className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Complete Package - Featured */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-yellow-400 text-primary-900 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Best Value
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save {PRICING_PLANS['complete-package'].discount}%
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{PRICING_PLANS['complete-package'].name}</h3>
                <p className="text-primary-100 mb-4">{PRICING_PLANS['complete-package'].description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold">{formatPrice(PRICING_PLANS['complete-package'].price)}</span>
                  <span className="text-xl ml-2">/month</span>
                  <span className="text-primary-200 line-through ml-4">
                    {formatPrice(PRICING_PLANS['complete-package'].originalPrice)}
                  </span>
                </div>
                <Link 
                  href="/signup" 
                  className="bg-yellow-400 text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center"
                >
                  Start Complete Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Everything Included:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRICING_PLANS['complete-package'].features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of businesses already using AI to create amazing content. 
            Get started today with our free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-yellow-400 text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
              Start Free Trial
            </Link>
            <Link href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">contact@aidigitalagency.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 2 hours</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea className="input-field" rows="4" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}