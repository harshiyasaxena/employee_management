import { Box } from '@mui/material';
import PublicNavbar from '../components/public/PublicNavbar';
import Footer from '../components/common/Footer';
import bgPublic from '../images/bg_public.jpg';

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${bgPublic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <PublicNavbar />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default PublicLayout;