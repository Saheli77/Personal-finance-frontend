import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, LinearProgress, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Alert } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';

// Lucrative finance illustration (unDraw, Unsplash, or similar)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80';

const demoTransactions = [
  { id: 1, desc: 'Amazon Purchase', amount: -120.99, date: '2025-08-01' },
  { id: 2, desc: 'Salary', amount: 3500.00, date: '2025-07-30' },
  { id: 3, desc: 'Groceries', amount: -75.50, date: '2025-07-28' },
  { id: 4, desc: 'Electricity Bill', amount: -60.00, date: '2025-07-27' }
];

function Dashboard({ token }) {
  const [user, setUser] = useState(null);
  // Demo data for dashboard
  const balance = 12450.32;
  const income = 3500.00;
  const expenses = 900.00;
  const savings = 8000.00;
  const budgetUsed = 63; // percent
  const fraudAlerts = [
    { id: 1, message: 'Unusual transaction detected: $900 at Electronics Store', date: '2025-07-25' }
  ];

  useEffect(() => {
    fetch('https://web-production-30781.up.railway.app/api/user', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setUser(data.user);
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 1, md: 3 } }}>
      {/* Hero Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'linear-gradient(90deg, #e3f2fd 0%, #fceabb 100%)',
        borderRadius: 4,
        mb: 4,
        p: { xs: 2, md: 4 },
        boxShadow: 2,
        background: 'linear-gradient(90deg, #e3f2fd 0%, #fceabb 100%)'
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight={800} color="primary.dark" mb={1}>
            Welcome{user ? `, ${user.username}` : ''}!
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={2}>
            Your AI-powered financial dashboard
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 1 }}>
            Logout
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={HERO_IMAGE} alt="Finance Hero" style={{ maxWidth: 340, borderRadius: 16, boxShadow: '0 6px 32px #90caf9' }} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Balance</Typography>
              <Typography variant="h5" fontWeight={700}>${balance.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Income</Typography>
              <Typography variant="h5" fontWeight={700}>${income.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Expenses</Typography>
              <Typography variant="h5" fontWeight={700}>${expenses.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Savings</Typography>
              <Typography variant="h5" fontWeight={700}>${savings.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Budget Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom>Budget Usage</Typography>
              <LinearProgress variant="determinate" value={budgetUsed} sx={{ height: 14, borderRadius: 6 }} />
              <Typography mt={1}>{budgetUsed}% of your monthly budget used</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* AI Financial Advice */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderLeft: '6px solid #1976d2' }}>
            <CardContent>
              <Typography variant="h6" color="primary">AI Financial Advice</Typography>
              <Typography mt={1}>
                Based on your spending, try to limit dining out to 10% of your income and increase your monthly savings by $200 for faster goal achievement.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Recent Transactions */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
              <List>
                {demoTransactions.map(tx => (
                  <div key={tx.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: tx.amount > 0 ? 'success.main' : 'error.main' }}>
                          {tx.amount > 0 ? <TrendingUpIcon /> : <PaymentIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={tx.desc}
                        secondary={tx.date}
                      />
                      <Typography color={tx.amount > 0 ? 'green' : 'red'} fontWeight={600}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* Fraud Alerts */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error" gutterBottom>Fraud Alerts</Typography>
              {fraudAlerts.length === 0 ? (
                <Typography color="textSecondary">No fraud detected.</Typography>
              ) : (
                fraudAlerts.map(alert => (
                  <Alert key={alert.id} icon={<WarningIcon />} severity="warning" sx={{ mb: 1 }}>
                    {alert.message} <br /> <small>{alert.date}</small>
                  </Alert>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
