-- Simulate ENUM gender_type
-- Using TEXT with CHECK constraint
CREATE TABLE IF NOT EXISTS profiles (
    profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT, -- UUID as TEXT
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    gender TEXT CHECK (gender IN ('male', 'female', 'nonBinary', 'other', 'preferNotToSay')),
    dob TIMESTAMP,
    synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Simulate ENUM library_type
CREATE TABLE IF NOT EXISTS libraries (
    library_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    name TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    type TEXT CHECK (type IN ('sync', 'local')) DEFAULT 'sync',
    synced BOOLEAN DEFAULT FALSE,
    author TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    library_id INTEGER,
    user_id TEXT,
    title TEXT NOT NULL,
    author TEXT,
    metadata JSON,
    toc JSON,
    cover_image_url TEXT,
    epub_url TEXT,
    is_saved BOOLEAN DEFAULT TRUE,
    read_count INTEGER DEFAULT 0 CHECK (read_count >= 0),
    last_read_at TIMESTAMP NOT NULL,
    synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Book contents table
CREATE TABLE IF NOT EXISTS book_contents (
    book_content_id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    content_json JSON,
    parsing_version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_book_contents_book_id ON book_contents(book_id);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
    setting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    app_theme TEXT DEFAULT 'default',
    app_accent TEXT,
    font_size INTEGER DEFAULT 14,
    language TEXT DEFAULT 'en',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
