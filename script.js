/**
 * BERAT.GG - GAMING BLOG INTERACTIVE LOGIC
 * Features: Live Filter, Instant Search, IDE Code Switcher, Dynamic Modals, Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. KATEGORİ FİLTRELEME SİSTEMİ
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif buton sınıfını güncelle
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            postCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==========================================
    // 2. CANLI ARAMA SİSTEMİ (SEARCH)
    // ==========================================
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.toggle('active');
            if (searchOverlay.classList.contains('active')) {
                searchInput.focus();
            }
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            // Tüm kartları görünür yap
            postCards.forEach(card => {
                card.style.display = 'flex';
                card.style.opacity = '1';
            });
        });

        // Arama girişini dinle
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            postCards.forEach(card => {
                const title = card.getAttribute('data-title')?.toLowerCase() || '';
                const text = card.textContent.toLowerCase();

                if (title.includes(query) || text.includes(query)) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }

    // ==========================================
    // 3. İNTERAKTİF IDE & KOD DEĞİŞTİRİCİ
    // ==========================================
    const codeFiles = {
        bot: {
            code: `# Python ile Oyun İstatistik & Refleks Analiz Scripti
import random
import time

class GameHero:
    def __init__(self, name, sport="Okçuluk"):
        self.name = name
        self.sport = sport
        self.stats = {"odak": 95, "refleks": 98, "kodlama": 90}
        
    def analiz_yap(self):
        print(f"🎯 Sporcu & Geliştirici: {self.name}")
        print(f"🏹 Ana Disiplin: {self.sport}")
        for stat, val in self.stats.items():
            print(f"  ⚡ {stat.upper()}: {'█' * (val // 10)} {val}/100")
        return "✨ Sonuç: Espor ve Yazılıma %100 Hazır!"

berat = GameHero("Berat", "Klasik & Makaralı Okçuluk")
print(berat.analiz_yap())`,
            output: `> python game_bot.py<br>
🎯 Sporcu & Geliştirici: Berat<br>
🏹 Ana Disiplin: Okçuluk<br>
&nbsp;&nbsp;⚡ ODAK: █████████ 95/100<br>
&nbsp;&nbsp;⚡ REFLEKS: █████████ 98/100<br>
&nbsp;&nbsp;⚡ KODLAMA: █████████ 90/100<br>
✨ Sonuç: Espor ve Yazılıma %100 Hazır!`
        },
        archery: {
            code: `# Okçuluk Antrenman & Puan Hesaplama Modülü
def okculuk_seri_hesapla(oklar):
    toplam = sum(oklar)
    ortalama = toplam / len(oklar)
    tam_isabet = oklar.count(10)
    
    print(f"🏹 Atılan Ok Sayısı: {len(oklar)}")
    print(f"🎯 Toplam Skor: {toplam} / {len(oklar) * 10}")
    print(f"⭐ 10 Puan İsabeti: {tam_isabet} adet")
    print(f"📊 Seri Ortalaması: {ortalama:.2f}")

# Son antrenman serisi (6 ok)
antrenman = [10, 10, 9, 10, 9, 10]
okculuk_seri_hesapla(antrenman)`,
            output: `> python okculuk_skor.py<br>
🏹 Atılan Ok Sayısı: 6<br>
🎯 Toplam Skor: 58 / 60<br>
⭐ 10 Puan İsabeti: 4 adet<br>
📊 Seri Ortalaması: 9.67<br>
🏅 Tebrikler! Şampiyona baraj puanı aşıldı.`
        },
        config: {
            code: `{
  "developer": "Berat",
  "location": "İzmir, TR",
  "role": "Gamer & Python Coder",
  "interests": [
    "Archery",
    "FPS Games",
    "Open World RPGs",
    "Algorithm Design"
  ],
  "theme": "Crimson Neon Dark",
  "version": "2.4.0-release"
}`,
            output: `> cat config.json | jq .<br>
{<br>
&nbsp;&nbsp;"status": "CONFIG_LOADED_OK",<br>
&nbsp;&nbsp;"system": "Ready for deployment"<br>
}`
        }
    };

    const ideTabs = document.querySelectorAll('.ide-tab');
    const codeDisplay = document.getElementById('codeDisplay');
    const terminalOutput = document.getElementById('terminalOutput');
    const runCodeBtn = document.getElementById('runCodeBtn');

    ideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ideTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const fileKey = tab.getAttribute('data-file');
            if (codeFiles[fileKey]) {
                codeDisplay.textContent = codeFiles[fileKey].code;
                terminalOutput.innerHTML = codeFiles[fileKey].output;
            }
        });
    });

    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', () => {
            terminalOutput.innerHTML = '<span style="color: #ffb703;">⚡ Kod derleniyor ve çalıştırılıyor...</span>';
            setTimeout(() => {
                const activeTab = document.querySelector('.ide-tab.active');
                const fileKey = activeTab ? activeTab.getAttribute('data-file') : 'bot';
                terminalOutput.innerHTML = codeFiles[fileKey].output;
                showToast("Python kodu başarıyla derlendi ve çalıştırıldı! ✅");
            }, 600);
        });
    }

    // ==========================================
    // 4. DETAYLI İNCELEME MODALI
    // ==========================================
    const reviewData = {
        cyber: {
            title: "Cyber Odyssey: Neon Çağında Hayatta Kalma",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
            score: "9.7 / 10",
            pros: ["Kusursuz ışın izleme ve atmosfer", "Zengin karakter gelişim ağacı", "Yüksek tekrar oynanabilirlik"],
            cons: ["Giriş seviyesi GPU'larda optimizasyon yükü", "Birkaç küçük yan görev tekrarı"],
            summary: "Cyber Odyssey, distopik neon dünyasını sadece görsel bir şölen olarak sunmakla kalmıyor; derin rol yapma dinamikleri ve taktiksel silah modifikasyonlarıyla oyuncuyu saatlerce ekrana kilitliyor. Kesinlikle yılın en iyi oyunlarından biri."
        },
        witcher: {
            title: "RPG Efsaneleri: Açık Dünya Tasarımının Zirve Noktası",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80",
            score: "9.8 / 10",
            pros: ["Unutulmaz hikaye ve karakterler", "Her yan görevin ana hikaye kalitesinde olması", "Mükemmel müzikler ve ses tasarımı"],
            cons: ["Dövüş mekaniklerinin kimi oyuncuya hantal gelmesi"],
            summary: "Modern rol yapma oyunlarının referans noktası olan bu yapım, ahlaki gri alanları ve seçimlerin sonuçlarını oyuncuya hissettirme konusunda rakipsiz kalmaya devam ediyor."
        },
        espor: {
            title: "2026 E-Spor Arenası: Taktiksel FPS'lerde Yeni Meta",
            image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1000&q=80",
            score: "Rekabetçi Rapor",
            pros: ["Yüksek rekabet temposu", "Dengeli silah ekonomisi", "Aktif turnuva ödül havuzları"],
            cons: ["Tek başına oynarken toksik oyuncu riski"],
            summary: "2026 sezonuyla birlikte taktiksel FPS oyunlarında utility kullanımı ve iletişim hızının önemi ikiye katlandı. Maç kazanmak sadece aim'e değil, harita bilgisi ve ekonomiyi iyi yönetmeye bakıyor."
        },
        aim: {
            title: "Gerçek Okçuluk Sporu Oyun Reflekslerini Nasıl Artırır?",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
            score: "Rehber & Tavsiye",
            pros: ["Daha düşük nabız ve stres yönetimi", "Sabit el hakimiyeti ve mikro kas kontrolü", "Hedefe anlık odaklanma becerisi"],
            cons: ["Fiziksel disiplin ve düzenli pratik gerektirir"],
            summary: "Bir okçu olarak yay çekerken ve nişan alırken uygulanan nefes teknikleri, FPS oyunlarında clutch anlarında sakin kalmanın doğrudan fiziksel anahtarıdır."
        },
        hardware: {
            title: "Yüksek Yenileme Hızı: Gerçekten Fark Yaratıyor mu?",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
            score: "Donanım Analizi",
            pros: ["Sıfır hareket bulanıklığı", "Milisaniyeler mertebesinde tepki avantajı", "Göz yorgunluğunu azaltma"],
            cons: ["Yüksek FPS beslemek için güçlü GPU ve CPU şart"],
            summary: "60Hz'den 144Hz veya 240Hz'e geçiş yalnızca görsel akıcılık değil, hareket halindeki rakipleri net tespit edebilmek adına espor düzeyinde olmazsa olmaz bir avantajdır."
        },
        survival: {
            title: "Issız Dünyalarda Üs Kurma: Gerçekçilik vs Eğlence",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
            score: "9.1 / 10",
            pros: ["Zengin inşaat modülleri", "Dinamik ekosistem ve tehlikeler", "Arkadaşlarla müthiş eğlence"],
            cons: ["Tek başına kaynak toplama zaman alabilir"],
            summary: "Hayatta kalma türü, oyuncuya kendi evini ve savunmasını sıfırdan kurma hissini verdiğinde eşsiz bir tatmine dönüşüyor."
        },
        opti: {
            title: "Düşük FPS ve Takılmalara Son: 10 Kritik Sistem Ayarı",
            image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=80",
            score: "%15-30 FPS Artışı",
            pros: ["Sıfır maliyetle performans artışı", "Mikro takılmaların (stuttering) önlenmesi", "Giriş gecikmesinin düşmesi"],
            cons: ["Bazı görsel detaylardan feragat gerektirebilir"],
            summary: "Arka plan başlangıç uygulamalarını kapatmak, XMP/EXPO profilini BIOS'tan açmak ve GPU sürücüsünü temiz kurulumla güncellemek sisteminize yeniden can verir."
        }
    };

    const reviewModal = document.getElementById('reviewModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalDynamicContent = document.getElementById('modalDynamicContent');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const postKey = btn.getAttribute('data-post');
            const data = reviewData[postKey] || reviewData['cyber'];

            const prosHtml = data.pros.map(p => `<li>${p}</li>`).join('');
            const consHtml = data.cons.map(c => `<li>${c}</li>`).join('');

            modalDynamicContent.innerHTML = `
                <div style="position: relative; border-radius: 8px; overflow: hidden; height: 220px; margin-bottom: 1.5rem;">
                    <img src="${data.image}" style="width:100%; height:100%; object-fit:cover;" alt="${data.title}">
                    <span style="position: absolute; bottom: 10px; right: 10px; background: #ff2a54; color:#fff; font-weight:800; padding: 4px 10px; border-radius: 4px;">
                        ${data.score}
                    </span>
                </div>
                <h2>${data.title}</h2>
                <p>${data.summary}</p>
                <div class="review-pros-cons">
                    <div class="pro-box">
                        <h4><i class="fa-solid fa-thumbs-up"></i> Güçlü Yönler</h4>
                        <ul>${prosHtml}</ul>
                    </div>
                    <div class="con-box">
                        <h4><i class="fa-solid fa-thumbs-down"></i> Eksiklikler</h4>
                        <ul>${consHtml}</ul>
                    </div>
                </div>
                <div style="text-align: right; margin-top: 1.5rem;">
                    <button class="btn btn-primary" onclick="document.getElementById('reviewModal').classList.remove('active')">
                        Kapat & Keşfe Devam Et
                    </button>
                </div>
            `;

            reviewModal.classList.add('active');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            reviewModal.classList.remove('active');
        });
    }

    // Modal dışına tıklandığında kapat
    window.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
        }
    });

    // ==========================================
    // 5. BÜLTEN FORMU & TOAST BİLDİRİMİ
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email) {
                showToast(`🎉 Tebrikler! ${email} bültene eklendi. Hoş geldin!`);
                emailInput.value = '';
            }
        });
    }

    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        const toastMsg = document.getElementById('toastMsg');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }
    }

    // ==========================================
    // 6. MOBİL HAMBURGER MENÜ
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });

        // Menü linklerine tıklandığında mobil menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
            });
        });
    }

    // ==========================================
    // 7. AKTİF NAVİGASYON BAĞLANTISI (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});
