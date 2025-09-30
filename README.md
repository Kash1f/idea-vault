# IdeaVault 🚀

**Track, Develop, and Launch Your Startup Ideas**

IdeaVault is a comprehensive platform for entrepreneurs to capture, organize, and manage their startup ideas throughout the entire development lifecycle.

## 🌟 Features

### 💡 Idea Management
- **Create & Store** - Capture innovative ideas with detailed descriptions
- **Categorize & Tag** - Organize ideas by category and development stage
- **Priority System** - Mark ideas as High, Medium, or Low priority
- **Rich Metadata** - Track market potential, target audience, revenue models, and competition

### 🔄 Development Lifecycle
Track your ideas through every stage:
- **Draft** - Initial concept phase
- **Research** - Market analysis and validation
- **Planning** - Strategy and roadmap development
- **Development** - Active building phase
- **Testing** - Quality assurance and user testing
- **Launched** - Live in market
- **Archived** - Completed or shelved ideas

### 📊 Smart Dashboard
- **Real-time Statistics** - Track total ideas, development status, and priorities
- **Visual Progress** - See your innovation pipeline at a glance
- **Quick Filters** - Filter by status, category, and search terms

### 🔒 Secure & Personal
- **User Authentication** - Secure JWT-based login system
- **Private Vault** - Your ideas are visible only to you
- **Data Protection** - Enterprise-grade security for your intellectual property

## 🛠️ Technical Stack

### Backend
- **Django REST Framework** - Robust API development
- **PostgreSQL** - Reliable database storage
- **JWT Authentication** - Secure user sessions
- **RESTful APIs** - Clean, predictable endpoints

### Frontend
- **React** - Modern, responsive user interface
- **REST API Integration** - Seamless backend communication
- **Component-based Architecture** - Maintainable and scalable codebase

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/register/` | Create new user account |
| `POST` | `/api/token/` | Obtain JWT access token |
| `POST` | `/api/token/refresh/` | Refresh access token |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/profile/` | Get current user profile |

### Idea Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/items/` | Get all user's ideas (with search/filter) |
| `POST` | `/api/items/` | Create new idea |
| `PUT` | `/api/items/update/{id}/` | Update existing idea |
| `DELETE` | `/api/items/delete/{id}/` | Delete idea |

## 🎯 Getting Started

### Prerequisites
- Python 3.13
- Node.js 18+
- PostgreSQL

### Backend Setup
```bash
# Clone repository
git clone [repository-url]
cd ideavault/backend

# Install dependencies
pip install 

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

### Frontend Setup
```bash
cd ideavault/frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL=postgres://user:password@localhost/ideavault
SECRET_KEY=your-secret-key
DEBUG=True
```

## 📱 Usage

1. **Register** - Create your account
2. **Add Ideas** - Start capturing your startup concepts
3. **Organize** - Categorize and prioritize your ideas
4. **Track Progress** - Update status as ideas develop
5. **Launch** - Move successful ideas to launched status

