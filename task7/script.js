
        class UserDataFetcher {
            constructor() {
                this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
                this.loadingIndicator = document.getElementById('loadingIndicator');
                this.errorContainer = document.getElementById('errorContainer');
                this.usersContainer = document.getElementById('usersContainer');
                this.reloadBtn = document.getElementById('reloadBtn');
                
                this.init();
            }

            init() {
                this.reloadBtn.addEventListener('click', () => this.fetchUsers());
                // Auto-load users on page load
                this.fetchUsers();
            }

            showLoading() {
                this.loadingIndicator.style.display = 'block';
                this.reloadBtn.disabled = true;
                this.reloadBtn.textContent = '⏳ Loading...';
            }

            hideLoading() {
                this.loadingIndicator.style.display = 'none';
                this.reloadBtn.disabled = false;
                this.reloadBtn.textContent = '🔄 Reload Users';
            }

            showError(message, isNetworkError = false) {
                this.errorContainer.innerHTML = `
                    <div class="error fade-in">
                        <h3>❌ ${isNetworkError ? 'Network Error' : 'Error'}</h3>
                        <p>${message}</p>
                        ${isNetworkError ? '<p class="retry-suggestion">Please check your internet connection and try again.</p>' : ''}
                    </div>
                `;
            }

            clearError() {
                this.errorContainer.innerHTML = '';
            }

            async fetchUsers() {
                this.showLoading();
                this.clearError();
                this.usersContainer.innerHTML = '';

                try {
                    const response = await fetch(this.apiUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                    }

                    const users = await response.json();
                    
                    if (!Array.isArray(users) || users.length === 0) {
                        throw new Error('No user data received from API');
                    }

                    this.displayUsers(users);
                    
                } catch (error) {
                    console.error('Fetch error:', error);
                    
                    if (error.name === 'TypeError' && error.message.includes('fetch')) {
                        this.showError(
                            'Unable to connect to the server. This could be due to network connectivity issues or the API being unavailable.',
                            true
                        );
                    } else {
                        this.showError(`Failed to fetch user data: ${error.message}`);
                    }
                } finally {
                    this.hideLoading();
                }
            }

            displayUsers(users) {
                const usersHTML = users.map((user, index) => {
                    return `
                        <div class="user-card fade-in" style="animation-delay: ${index * 0.1}s">
                            <div class="user-name">${this.escapeHtml(user.name)}</div>
                            
                            <div class="user-info">
                                <span class="info-label">📧 Email:</span>
                                <span class="info-value">
                                    <a href="mailto:${this.escapeHtml(user.email)}" class="email-link">
                                        ${this.escapeHtml(user.email)}
                                    </a>
                                </span>
                            </div>
                            
                            <div class="user-info">
                                <span class="info-label">📱 Phone:</span>
                                <span class="info-value">${this.escapeHtml(user.phone)}</span>
                            </div>
                            
                            <div class="user-info">
                                <span class="info-label">🌐 Website:</span>
                                <span class="info-value">
                                    <a href="http://${this.escapeHtml(user.website)}" target="_blank" class="email-link">
                                        ${this.escapeHtml(user.website)}
                                    </a>
                                </span>
                            </div>
                            
                            <div class="address">
                                <div class="address-title">📍 Address</div>
                                <div>${this.escapeHtml(user.address.street)} ${this.escapeHtml(user.address.suite)}</div>
                                <div>${this.escapeHtml(user.address.city)}, ${this.escapeHtml(user.address.zipcode)}</div>
                                <div><strong>Company:</strong> ${this.escapeHtml(user.company.name)}</div>
                            </div>
                        </div>
                    `;
                }).join('');

                this.usersContainer.innerHTML = usersHTML;
            }

            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new UserDataFetcher();
        });

        // Additional error handling for unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });