// 여행 데이터
const travelData = {
    packages: [
        {
            id: 1,
            title: "가우디 투어 (3박 4일)",
            description: "바르셀로나 + 감동 힐링, 사그라다 파밀리아 포함",
            price: 2500000,
            image: "images/packages/gaudi-tour.jpg",
            included: "버스투어, 숙박, 투어",
            details: {
                course: "바르셀로나(3박) → 몬세라트(당일)",
                includes: [
                    "4성급 호텔 숙박",
                    "전문 가이드 투어",
                    "공항-호텔 송영",
                    "주요 관광지 입장권"
                ],
                highlights: "사그라다 파밀리아, 구엘공원, 카탈루냐 광장"
            }
        },
        {
            id: 2,
            title: "남부 스페인 문화여행 (5박 6일)",
            description: "세비야 + 그라나다 + 말라가",
            price: 1800000,
            image: "images/packages/south-spain.jpg",
            included: "항공권, 숙박, 투어",
            details: {
                course: "세비야(2박) → 그라나다(2박) → 말라가(1박)",
                includes: [
                    "4성급 호텔 숙박",
                    "전문 가이드 동행",
                    "전 일정 조식",
                    "시내 교통편"
                ],
                highlights: "알람브라 궁전, 세비야 대성당, 론다"
            }
        },
        {
            id: 3,
            title: "스페인 일주 기차 여행 (9박 10일)",
            description: "마드리드부터 바르셀로나까지 특별한 유럽 여행",
            price: 2900000,
            image: "images/packages/train-tour.jpg",
            included: "기차 여행",
            details: {
                course: "마드리드(2박) → 톨레도(당일) → 세비야(2박) → 그라나다(1박) → 바르셀로나(3박)",
                includes: [
                    "스페인 고속철도 AVE 1등석 승차권",
                    "4-5성급 호텔 숙박",
                    "전문 가이드 동행",
                    "주요 관광지 입장권",
                    "조식 및 특별 만찬 2회"
                ],
                highlights: "프라도 미술관, 톨레도 대성당, 알함브라 궁전, 사그라다 파밀리아"
            }
        }
    ]
};

// 네비게이션 스크롤 효과
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // 시작하기 버튼 클릭 이벤트
    const startButton = document.querySelector('.hero-content .btn-primary');
    if (startButton) {
        startButton.addEventListener('click', () => {
            document.querySelector('#package').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 패키지 여행 데이터 렌더링
function renderPackages() {
    const packagesContainer = document.querySelector('#package-container');
    if (!packagesContainer) return;

    travelData.packages.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = 'col-lg-6 mb-4';
        packageElement.innerHTML = `
            <div class="card h-100">
                <img src="${pkg.image}" class="card-img-top package-img" alt="${pkg.title}" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h3 class="card-title mb-3">${pkg.title}</h3>
                    <p class="card-text h5 mb-4">${pkg.description}</p>
                    
                    <h5 class="mb-3">여행 코스</h5>
                    <p class="card-text mb-4">${pkg.details.course}</p>
                    
                    <h5 class="mb-3">포함 사항</h5>
                    <ul class="list-unstyled mb-4">
                        ${pkg.details.includes.map(item => `
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>${item}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <h5 class="mb-3">주요 관광지</h5>
                    <p class="card-text mb-4">${pkg.details.highlights}</p>

                    <p class="card-text"><strong class="h4">₩${pkg.price.toLocaleString()}</strong></p>
                    <button class="btn btn-primary btn-lg w-100" onclick="bookPackage(${pkg.id})">예약하기</button>
                </div>
            </div>
        `;
        packagesContainer.appendChild(packageElement);
    });
}

// 패키지 예약 함수
function bookPackage(packageId) {
    const selectedPackage = travelData.packages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) return;

    alert(`${selectedPackage.title} 패키지가 장바구니에 추가되었습니다.`);
    // 여기에 장바구니 로직 추가
}

// 현재 페이지가 패키지 페이지일 때만 패키지 렌더링
if (window.location.pathname.includes('package.html')) {
    document.addEventListener('DOMContentLoaded', renderPackages);
} 