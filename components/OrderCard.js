import { useState } from 'react';
import { FileText, Image, Video, Mic, Calendar, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye } from 'lucide-react';

const OrderCard = ({ order, onStatusUpdate, onDownload, onPreview, isAdmin = false }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const serviceIcons = {
    blog: FileText,
    graphics: Image,
    video: Video,
    voiceover: Mic
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    pending: AlertCircle,
    in_progress: Clock,
    completed: CheckCircle,
    cancelled: XCircle
  };

  const Icon = serviceIcons[order.serviceType] || FileText;
  const StatusIcon = statusIcons[order.status] || AlertCircle;

  const handleStatusUpdate = async (newStatus) => {
    if (!onStatusUpdate) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(order.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceDisplayName = (serviceType) => {
    const names = {
      blog: 'Blog Writing',
      graphics: 'Graphic Design',
      video: 'Video Production',
      voiceover: 'Voiceover'
    };
    return names[serviceType] || serviceType;
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {getServiceDisplayName(order.serviceType)}
            </h3>
            <p className="text-sm text-gray-500">Order #{order.id?.slice(-8) || 'N/A'}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusColors[order.status]}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">{order.status.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-4">
        {order.topic && (
          <div>
            <span className="text-sm font-medium text-gray-700">Topic: </span>
            <span className="text-sm text-gray-600">{order.topic}</span>
          </div>
        )}
        
        {order.description && (
          <div>
            <span className="text-sm font-medium text-gray-700">Description: </span>
            <span className="text-sm text-gray-600">{order.description}</span>
          </div>
        )}

        {order.keywords && (
          <div>
            <span className="text-sm font-medium text-gray-700">Keywords: </span>
            <span className="text-sm text-gray-600">{order.keywords}</span>
          </div>
        )}

        {order.wordCount && (
          <div>
            <span className="text-sm font-medium text-gray-700">Word Count: </span>
            <span className="text-sm text-gray-600">{order.wordCount} words</span>
          </div>
        )}

        {order.style && (
          <div>
            <span className="text-sm font-medium text-gray-700">Style: </span>
            <span className="text-sm text-gray-600 capitalize">{order.style}</span>
          </div>
        )}

        {/* Additional Options */}
        <div className="flex flex-wrap gap-2">
          {order.premium && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Premium
            </span>
          )}
          {order.rush && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Rush
            </span>
          )}
          {order.revisions > 1 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {order.revisions} Revisions
            </span>
          )}
        </div>
      </div>

      {/* Price and Date */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium">${order.estimatedPrice || order.price}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(order.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          {order.status === 'completed' && (
            <>
              {onPreview && (
                <button
                  onClick={() => onPreview(order)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              )}
              {onDownload && (
                <button
                  onClick={() => onDownload(order)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Admin Status Update */}
        {isAdmin && order.status !== 'completed' && order.status !== 'cancelled' && (
          <div className="flex space-x-2">
            {order.status === 'pending' && (
              <button
                onClick={() => handleStatusUpdate('in_progress')}
                disabled={isUpdating}
                className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
              >
                Start Work
              </button>
            )}
            {order.status === 'in_progress' && (
              <button
                onClick={() => handleStatusUpdate('completed')}
                disabled={isUpdating}
                className="px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
              >
                Mark Complete
              </button>
            )}
            <button
              onClick={() => handleStatusUpdate('cancelled')}
              disabled={isUpdating}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      {order.status === 'in_progress' && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{order.progress || 50}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${order.progress || 50}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;