import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordUsageComponent } from './word-usage.component';

describe('WordUsageComponent', () => {
  let component: WordUsageComponent;
  let fixture: ComponentFixture<WordUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
