#!/bin/bash
# Telr Payment Flow - Quick Start & Testing Script
# This script helps you set up and test the Telr payment integration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logo
echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║        MyFoundersClub - Telr Payment Flow Setup            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found!${NC}"
    echo -e "Creating from template..."
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✓ Created .env.local${NC}"
        echo -e "${YELLOW}Please edit .env.local with your Telr credentials${NC}"
        exit 1
    else
        echo -e "${RED}✗ .env.local.example not found${NC}"
        exit 1
    fi
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Installing pnpm...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm found: $(pnpm --version)${NC}"

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    pnpm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
fi

# Menu
while true; do
    echo ""
    echo -e "${BLUE}Choose an option:${NC}"
    echo "1. Start development server"
    echo "2. View configuration"
    echo "3. Run E2E tests"
    echo "4. View payment logs"
    echo "5. Check Supabase connection"
    echo "6. View documentation"
    echo "0. Exit"
    echo ""
    read -p "Enter your choice [0-6]: " choice

    case $choice in
        1)
            echo -e "${BLUE}Starting development server...${NC}"
            echo -e "${YELLOW}Server will be available at http://localhost:3000${NC}"
            pnpm dev
            ;;
        2)
            echo -e "${BLUE}Current Configuration:${NC}"
            echo ""
            if grep -q "TELR_STORE_ID=" .env.local; then
                echo -e "TELR_STORE_ID: $(grep 'TELR_STORE_ID=' .env.local | cut -d '=' -f2)"
                echo -e "TELR_SANDBOX_MODE: $(grep 'TELR_SANDBOX_MODE=' .env.local | cut -d '=' -f2)"
                echo -e "SMTP_HOST: $(grep 'SMTP_HOST=' .env.local | cut -d '=' -f2)"
                echo -e "SUPABASE_URL: $(grep 'NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d '=' -f2)"
                echo ""
                echo -e "${GREEN}✓ Configuration found${NC}"
            else
                echo -e "${YELLOW}⚠️  Some variables are missing${NC}"
            fi
            echo ""
            echo "To edit configuration: nano .env.local"
            ;;
        3)
            echo -e "${BLUE}Running E2E Tests...${NC}"
            echo -e "${YELLOW}Make sure development server is running (option 1)${NC}"
            echo ""
            read -p "Press Enter to continue or Ctrl+C to cancel..."
            # Run tests (would need actual test runner)
            echo -e "${YELLOW}E2E tests require the development server running in another terminal${NC}"
            echo "See TELR_E2E_TESTING_GUIDE.md for manual testing steps"
            ;;
        4)
            echo -e "${BLUE}Payment Logs:${NC}"
            echo "Check your server terminal output for payment logs while running 'pnpm dev'"
            echo ""
            echo "Look for messages like:"
            echo "  📥 Telr Callback Received"
            echo "  ✓ Payment creation successful"
            echo "  ✉️  Confirmation email sent"
            ;;
        5)
            echo -e "${BLUE}Testing Supabase Connection...${NC}"
            if [ -z "$(grep 'NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d '=' -f2)" ]; then
                echo -e "${RED}✗ NEXT_PUBLIC_SUPABASE_URL not configured${NC}"
            else
                echo -e "${GREEN}✓ Supabase URL configured${NC}"
                echo "  URL: $(grep 'NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d '=' -f2)"
                echo ""
                echo -e "${YELLOW}To verify connection:${NC}"
                echo "1. Go to http://localhost:3000/admin"
                echo "2. Log in with admin / adminmfc26"
                echo "3. Check if Applications section loads data"
            fi
            ;;
        6)
            echo -e "${BLUE}Documentation Files:${NC}"
            echo ""
            if [ -f "TELR_E2E_TESTING_GUIDE.md" ]; then
                echo -e "${GREEN}✓ TELR_E2E_TESTING_GUIDE.md${NC}"
                echo "  - Complete end-to-end testing guide"
                echo "  - Curl command examples"
                echo "  - Troubleshooting steps"
            fi
            if [ -f "ENV_SETUP_GUIDE.md" ]; then
                echo -e "${GREEN}✓ ENV_SETUP_GUIDE.md${NC}"
                echo "  - Environment variable configuration"
                echo "  - Telr, Stripe, SMTP setup"
                echo "  - Security best practices"
            fi
            if [ -f "PAYMENT_INTEGRATION_GUIDE.md" ]; then
                echo -e "${GREEN}✓ PAYMENT_INTEGRATION_GUIDE.md${NC}"
                echo "  - API endpoints documentation"
                echo "  - Payment flow diagrams"
                echo "  - Integration details"
            fi
            echo ""
            echo -e "${BLUE}Quick Start:${NC}"
            echo "1. Edit .env.local with your Telr credentials"
            echo "2. Run: pnpm dev"
            echo "3. Visit: http://localhost:3000"
            echo "4. Click 'Get Access' on Founder Pass plan"
            echo "5. Follow TELR_E2E_TESTING_GUIDE.md for testing"
            ;;
        0)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            ;;
    esac
done
