// src/App.tsx (NEW VERSION - 50 lines)
import React, { lazy, Suspense, useState } from 'react';
import { LANG_OPTIONS } from './components/AppContent';
import { Layout } from './components/Layout';
import { AppContent } from './components/AppContent';
import { useAppLogic } from './hooks/useAppLogic';
import { askTaraAboutPlatform } from './services';
import './index.css'

// Lazy load all modals
const HistoryModal = lazy(() => import('./components/HistoryModal').then(m => ({ default: m.HistoryModal })));
const GuideModal = lazy(() => import('./components/GuideModal').then(m => ({ default: m.GuideModal })));
const DeveloperModal = lazy(() => import('./components/DeveloperModal').then(m => ({ default: m.DeveloperModal })));
const FanGalleryModal = lazy(() => import('./components/FanGalleryModal').then(m => ({ default: m.FanGalleryModal })));
const CatalogModal = lazy(() => import('./components/CatalogModal').then(m => ({ default: m.CatalogModal })));
const PermissionModal = lazy(() => import('./components/PermissionModal').then(m => ({ default: m.PermissionModal })));
const LimitModal = lazy(() => import('./components/LimitModal').then(m => ({ default: m.LimitModal })));
const ConsentModal = lazy(() => import('./components/ConsentModal').then(m => ({ default: m.ConsentModal })));
const PronunciationModal = lazy(() => import('./components/PronunciationModal').then(m => ({ default: m.PronunciationModal })));

const RECAPTCHA_SITE_KEY = "6LdTFlUsAAAAALH-MlZGFD7tFEo_1x1FJBWIYNAK";

export const App: React.FC = () => {
  const [isHelpActive, setIsHelpActive] = useState(false);
  const app = useAppLogic();

  const handleAskInfo = async () => {
    if (app.isBusy) return;
    if (app.usageCount >= app.MAX_DAILY_REQUESTS) { 
      app.isLimitReached(true); 
      return; 
    }
    const info = await askTaraAboutPlatform();
    app.setMascotMessage(info);
    const nc = app.usageCount + 1;
    app.usageCount(nc);
    // Note: saveData should be in useAppLogic
  };

  if (!app.isLoaded) return null;

  return (
    <>
      <div className="pt-10 md:pt-12 font-sans">
        <Layout
          activeModal={app.isHistoryModalOpen ? 'history' : app.isGuideModalOpen ? 'guide' : app.isDevModalOpen ? 'dev' : app.isFanGalleryModalOpen ? 'gallery' : app.isCatalogModalOpen ? 'catalog' : null}
          onHistoryClick={() => !app.isBusy && app.setIsHistoryModalOpen(true)}
          onGuideClick={() => !app.isBusy && app.setIsGuideModalOpen(true)}
          onDevClick={() => !app.isBusy && app.setIsDevModalOpen(true)}
          onGalleryClick={() => !app.isBusy && app.setIsFanGalleryModalOpen(true)}
          onCatalogClick={() => !app.isBusy && app.setIsCatalogModalOpen(true)}
          onEditorClick={() => { 
            if(!app.isBusy) { 
              app.setIsHistoryModalOpen(false); 
              app.setIsGuideModalOpen(false); 
              app.setIsDevModalOpen(false); 
              app.setIsFanGalleryModalOpen(false); 
              app.setIsCatalogModalOpen(false); 
              window.scrollTo({top:0, behavior:'smooth'}); 
            }
          }}
          isHelpActive={isHelpActive}
          onHelpToggle={() => !app.isBusy && setIsHelpActive(prev => !prev)}
          isBusy={app.isBusy}
        >
          <AppContent 
            isHelpActive={isHelpActive}
            onHelpToggle={() => !app.isBusy && setIsHelpActive(prev => !prev)}
            isBusy={app.isBusy}
            onAskInfo={handleAskInfo}
          />
        </Layout>

        <Suspense fallback={null}>
          <ConsentModal 
            isOpen={!app.hasAcceptedConsent} 
            onAccept={() => app.setHasAcceptedConsent(true)} 
            onReject={() => window.location.href = 'https://google.com'} 
            recaptchaSiteKey={RECAPTCHA_SITE_KEY} 
          />
          
          {app.permissionType && (
            <PermissionModal 
              type={app.permissionType} 
              onAccept={() => { 
                if (app.permissionType === 'mic') { 
                  app.startRecording(); 
                } else if (app.permissionType === 'plagiarism') {
                  app.triggerAnalysis(true); 
                } 
                app.setPermissionType(null); 
              }} 
              onDeny={() => app.setPermissionType(null)} 
            />
          )}
          
          <LimitModal isOpen={app.isLimitReached && app.isLimitModalOpen} onClose={() => app.setIsLimitModalOpen(false)} />
          <HistoryModal 
            isOpen={app.isHistoryModalOpen} 
            onClose={() => app.setIsHistoryModalOpen(false)} 
            history={app.history} 
            onSelectItem={(it) => { 
              app.setInputText(it.originalText); 
              app.setResult(it.result); 
            }} 
            onClearAll={() => { 
              if(confirm("Hapus semua?")) app.setHistory([]); 
            }} 
          />
          <GuideModal isOpen={app.isGuideModalOpen} onClose={() => app.setIsGuideModalOpen(false)} />
          <DeveloperModal isOpen={app.isDevModalOpen} onClose={() => app.setIsDevModalOpen(false)} />
          <FanGalleryModal isOpen={app.isFanGalleryModalOpen} onClose={() => app.setIsFanGalleryModalOpen(false)} />
          <CatalogModal isOpen={app.isCatalogModalOpen} onClose={() => app.setIsCatalogModalOpen(false)} />
          <PronunciationModal 
            isOpen={app.isPronunciationModalOpen} 
            onClose={() => app.setIsPronunciationModalOpen(false)} 
            originalText={app.result?.correctedText || app.inputText} 
            translation={app.result?.translation} 
            currentTargetLangLabel={LANG_OPTIONS.find(opt => opt.value === app.targetLang)?.label || app.targetLang}
            onSuccess={() => {}} 
          />
        </Suspense>
      </div>
    </>
  );
};

export default App;