import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PartnersPage } from './pages/PartnersPage';
import { MembersPage } from './pages/MembersPage';
import { AboutBrazilPage, AboutRussiaPage, ProjectsPage, LinksPage, AmbassadorLetterPage } from './pages/brazil-russia';
import { NewsPage } from './pages/NewsPage';
import { NewsPostPage } from './pages/NewsPostPage';
import { EventsPage } from './pages/EventsPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { MembershipApplicationsPage } from './pages/admin/MembershipApplicationsPage';
import { ContactMessagesPage } from './pages/admin/ContactMessagesPage';
import { CommentsPage } from './pages/admin/CommentsPage';
import { EventsAdminPage } from './pages/admin/EventsAdminPage';
import ArticleEditorPage from './pages/admin/ArticleEditorPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/admin/article/new" element={<ProtectedRoute><ArticleEditorPage /></ProtectedRoute>} />
            <Route path="/admin/article/:id" element={<ProtectedRoute><ArticleEditorPage /></ProtectedRoute>} />
            <Route path="/admin/comments" element={<ProtectedRoute><CommentsPage /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><EventsAdminPage /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><MembershipApplicationsPage /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><ContactMessagesPage /></ProtectedRoute>} />
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
            <Route path="/partners" element={<Layout><PartnersPage /></Layout>} />
            <Route path="/members" element={<Layout><MembersPage /></Layout>} />
            <Route path="/brazil-russia/about-brazil" element={<Layout><AboutBrazilPage /></Layout>} />
            <Route path="/brazil-russia/about-russia" element={<Layout><AboutRussiaPage /></Layout>} />
            <Route path="/brazil-russia/projects" element={<Layout><ProjectsPage /></Layout>} />
            <Route path="/brazil-russia/links" element={<Layout><LinksPage /></Layout>} />
            <Route path="/brazil-russia/ambassador-letter" element={<Layout><AmbassadorLetterPage /></Layout>} />
            <Route path="/news" element={<Layout><NewsPage /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsPostPage /></Layout>} />
            <Route path="/events" element={<Layout><EventsPage /></Layout>} />
            <Route path="/publications" element={<Layout><PublicationsPage /></Layout>} />
            <Route path="/membership" element={<Layout><MembershipPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
