-- Create versions table for seamless version management
CREATE TABLE IF NOT EXISTS versions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(20) NOT NULL,
  build_number INT NOT NULL,
  min_required_version VARCHAR(20) DEFAULT '1.0.0',
  force_update BOOLEAN DEFAULT FALSE,
  update_message TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial version (current app version)
INSERT INTO versions (version, build_number, force_update, update_message, is_active) 
VALUES ('1.0.4', 2, FALSE, 'Current stable version', TRUE);

-- Insert a test version to trigger update (uncomment to test)
INSERT INTO versions (version, build_number, force_update, update_message, is_active) 
  VALUES ('1.0.5', 5, TRUE, 'Critical update required - please update now!', TRUE); 