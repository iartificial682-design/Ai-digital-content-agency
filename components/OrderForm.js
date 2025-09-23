import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { calculatePrice } from '../utils/aiHelpers';
import { FileText, Image, Video, Mic, DollarSign, Clock, Star } from 'lucide-react';

const OrderForm = ({ onSubmit, isLoading = false }) => {
  const [selectedService, setSelectedService] = useState('blog');
  const [estimatedPrice, setEstimatedPrice] = useState(25);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      serviceType: 'blog',
      premium: false,
      rush: false,
      revisions: 1
    }
  });

  const watchedValues = watch();

  // Update price when form values change
  useState(() => {
    const price = calculatePrice(watchedValues.serviceType, {
      premium: watchedValues.premium,
      rush: watchedValues.rush,
      revisions: watchedValues.revisions
    });
    setEstimatedPrice(price);
  }, [watchedValues]);

  const services = [
    {
      id: 'blog',
      name: 'Blog Writing',
      icon: FileText,
      description: 'AI-generated blog posts and articles',
      basePrice: 25,
      fields: ['topic', 'keywords', 'wordCount']
    },
    {
      id: 'graphics',
      name: 'Graphic Design',
      icon: Image,
      description: 'Custom graphics and visual content',
      basePrice: 15,
      fields: ['description', 'style', 'dimensions']
    },
    {
      id: 'video',
      name: 'Video Production',
      icon: Video,
      description: 'AI-generated video content',
      basePrice: 50,
      fields: ['script', 'duration', 'style']
    },
    {
      id: 'voiceover',
      name: 'Voiceover',
      icon: Mic,
      description: 'Professional AI voiceover services',
      basePrice: 20,
      fields: ['text', 'voice', 'language']
    }
  ];

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    const price = calculatePrice(serviceId, {
      premium: watchedValues.premium,
      rush: watchedValues.rush,
      revisions: watchedValues.revisions
    });
    setEstimatedPrice(price);
  };

  const onFormSubmit = (data) => {
    const orderData = {
      ...data,
      estimatedPrice,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    onSubmit(orderData);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`relative rounded-lg border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleServiceChange(service.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${
                        selectedService === service.id ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <p className="text-sm font-medium text-primary-600">
                          Starting at ${service.basePrice}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    {...register('serviceType', { required: true })}
                    value={service.id}
                    className="sr-only"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Service-specific fields */}
        {selectedServiceData && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedServiceData.name} Details
            </h3>
            
            {selectedServiceData.fields.includes('topic') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic/Subject *
                </label>
                <input
                  type="text"
                  {...register('topic', { required: 'Topic is required' })}
                  className="input-field"
                  placeholder="Enter the topic for your blog post"
                />
                {errors.topic && (
                  <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
                )}
              </div>
            )}

            {selectedServiceData.fields.includes('keywords') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  {...register('keywords')}
                  className="input-field"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
            )}

            {selectedServiceData.fields.includes('wordCount') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Word Count
                </label>
                <select {...register('wordCount')} className="input-field">
                  <option value="500">500 words</option>
                  <option value="1000">1000 words</option>
                  <option value="1500">1500 words</option>
                  <option value="2000">2000 words</option>
                </select>
              </div>
            )}

            {selectedServiceData.fields.includes('description') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="input-field"
                  rows="3"
                  placeholder="Describe what you want in your graphic"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            )}

            {selectedServiceData.fields.includes('script') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Script/Content *
                </label>
                <textarea
                  {...register('script', { required: 'Script is required' })}
                  className="input-field"
                  rows="4"
                  placeholder="Enter the script or content for your video"
                />
                {errors.script && (
                  <p className="text-red-500 text-sm mt-1">{errors.script.message}</p>
                )}
              </div>
            )}

            {selectedServiceData.fields.includes('text') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text to Convert *
                </label>
                <textarea
                  {...register('text', { required: 'Text is required' })}
                  className="input-field"
                  rows="4"
                  placeholder="Enter the text you want converted to speech"
                />
                {errors.text && (
                  <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
                )}
              </div>
            )}

            {selectedServiceData.fields.includes('style') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select {...register('style')} className="input-field">
                  <option value="modern">Modern</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Additional Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Additional Options</h3>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('premium')}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Premium Quality (+50%)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('rush')}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                Rush Delivery (+30%)
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Revisions
            </label>
            <select {...register('revisions')} className="input-field">
              <option value="1">1 revision (included)</option>
              <option value="2">2 revisions (+$5)</option>
              <option value="3">3 revisions (+$10)</option>
              <option value="4">4 revisions (+$15)</option>
            </select>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-lg font-medium text-gray-900">
                Estimated Total:
              </span>
            </div>
            <span className="text-2xl font-bold text-primary-600">
              ${estimatedPrice}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full btn-primary py-3 text-lg ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;