import axios from 'axios';

// OpenAI API helper functions
export const generateBlogContent = async (topic, keywords, wordCount = 1000) => {
  try {
    const response = await axios.post('/api/generate-blog', {
      topic,
      keywords,
      wordCount
    });
    return response.data;
  } catch (error) {
    console.error('Error generating blog content:', error);
    throw error;
  }
};

export const generateGraphics = async (description, style = 'modern', dimensions = '1024x1024') => {
  try {
    const response = await axios.post('/api/generate-graphics', {
      description,
      style,
      dimensions
    });
    return response.data;
  } catch (error) {
    console.error('Error generating graphics:', error);
    throw error;
  }
};

export const generateVideo = async (script, duration = 60, style = 'professional') => {
  try {
    const response = await axios.post('/api/generate-video', {
      script,
      duration,
      style
    });
    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};

export const generateVoiceover = async (text, voice = 'professional', language = 'en') => {
  try {
    const response = await axios.post('/api/generate-voiceover', {
      text,
      voice,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Error generating voiceover:', error);
    throw error;
  }
};

// Helper function to format AI responses
export const formatAIResponse = (response, type) => {
  switch (type) {
    case 'blog':
      return {
        title: response.title || 'Generated Blog Post',
        content: response.content || response.text,
        wordCount: response.wordCount || 0,
        keywords: response.keywords || [],
        createdAt: new Date().toISOString()
      };
    case 'graphics':
      return {
        imageUrl: response.imageUrl || response.url,
        description: response.description,
        style: response.style,
        dimensions: response.dimensions,
        createdAt: new Date().toISOString()
      };
    case 'video':
      return {
        videoUrl: response.videoUrl || response.url,
        duration: response.duration,
        script: response.script,
        style: response.style,
        createdAt: new Date().toISOString()
      };
    case 'voiceover':
      return {
        audioUrl: response.audioUrl || response.url,
        text: response.text,
        voice: response.voice,
        language: response.language,
        duration: response.duration,
        createdAt: new Date().toISOString()
      };
    default:
      return response;
  }
};

// Pricing calculator
export const calculatePrice = (serviceType, options = {}) => {
  const basePrices = {
    blog: 25,
    graphics: 15,
    video: 50,
    voiceover: 20
  };

  let price = basePrices[serviceType] || 0;

  // Add premium options
  if (options.premium) price *= 1.5;
  if (options.rush) price *= 1.3;
  if (options.revisions > 1) price += (options.revisions - 1) * 5;

  return Math.round(price * 100) / 100; // Round to 2 decimal places
};