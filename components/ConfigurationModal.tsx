import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { MessageBox } from './MessageBox';

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  currentUrl?: string;
}

export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUrl = ''
}) => {
  const [url, setUrl] = useState(currentUrl);

  // message box state
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgTitle, setMsgTitle] = useState<string | undefined>(undefined);
  const [msgText, setMsgText] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error' | 'info'>('info');

  // Ensure the input is synced with the latest `currentUrl` each time
  // the modal is opened or when `currentUrl` changes externally.
  useEffect(() => {
    setUrl(currentUrl ?? '');
  }, [currentUrl, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      onClose();
    }
  };

  // Validate the configured URL by fetching it and performing basic JSON validation
  const handleCheck = async () => {
    const trimmed = (url ?? '').trim();
    if (!trimmed) {
      setMsgType('error');
      setMsgTitle('校验失败');
      setMsgText('请先输入要检查的 URL。');
      setMsgOpen(true);
      return;
    }

    try {
      // Basic URL format check
      try {
        new URL(trimmed);
      } catch {
        throw new Error('无效的 URL 格式。');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(trimmed, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`请求失败：${res.status} ${res.statusText}`);

      // try parse JSON
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('返回数据不是数组（预期歌曲列表数组）。');

      // basic element validation
      if (data.length > 0) {
        const requiredFields = ['id', 'title', 'artist', 'coverUrl', 'audioUrl', 'lyricUrl'];
        const invalid = data.filter((s: any) => !requiredFields.every(f => f in s));
        if (invalid.length > 0) throw new Error('数据格式错误：部分条目缺少必需字段。');
      }

      setMsgType('success');
      setMsgTitle('校验通过');
      setMsgText('该 URL 返回了有效的歌曲列表，格式看起来正确。');
      setMsgOpen(true);
    } catch (err) {
      let message = '校验失败：未知错误。';
      if (err instanceof Error) {
        if (err.name === 'AbortError') message = '请求超时或被中止。';
        else message = err.message;
      }
      setMsgType('error');
      setMsgTitle('校验失败');
      setMsgText(message);
      setMsgOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-theme-surface w-full max-w-md backdrop-blur-xl border border-theme-accent/30 rounded-2xl shadow-2xl shadow-theme-glow p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-theme-text">配置DOU音源</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full transition-colors text-theme-base hover:bg-theme-accent/20 hover:text-theme-text"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="url-input" className="block text-sm font-medium text-theme-subtext mb-2">
                    JSON 数据源 URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="url-input"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/songs.json"
                      className="flex-1 px-4 py-2 rounded-lg bg-theme-base border border-theme-accent/30 text-theme-text placeholder-theme-subtext/50 focus:outline-none focus:ring-2 focus:ring-theme-accent/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleCheck}
                      title="检查文件有效性"
                      aria-label="检查文件有效性"
                      className="p-2 rounded-lg bg-theme-surface border border-theme-accent/20 text-theme-subtext hover:bg-theme-accent/10 transition-colors"
                    >
                      <Check size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-theme-subtext hover:bg-theme-accent/20 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-theme-accent text-theme-base hover:opacity-90 transition-opacity"
                  >
                    加载音源
                  </button>
                </div>
              </form>

              <MessageBox
                isOpen={msgOpen}
                title={msgTitle}
                message={msgText}
                type={msgType}
                onClose={() => setMsgOpen(false)}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
